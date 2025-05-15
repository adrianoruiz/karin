### Plano de Implementação — Horário de Funcionamento + Upload/Avatar (Plano 3 Melhorado)

Este plano combina as melhores práticas dos dois planos fornecidos, incorporando eficiência, segurança e flexibilidade, além de adicionar melhorias para se alinhar a um style-guide típico de projetos Laravel. Ele cobre a implementação de **horários de funcionamento** e **upload de avatar**, pensado para integração em um sistema existente com serviços, requests e controllers.

---

#### 1. **Migrations**

| Tabela            | Campos principais                                                                                   | Observações                                                    |
|-------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `working_hours`   | `id` (PK) • `user_id` (FK) • `day_of_week` (tinyInteger, 0-6) • `opens_at` (time) • `closes_at` (time) • `is_open` (boolean) | **Unique** (`user_id`, `day_of_week`) para evitar duplicidade. |
| `images`          | `id` • `path` • `filename` • `imageable_id` • `imageable_type`                                      | Usada para avatars via relacionamento polimórfico (se existir).|

```php
// database/migrations/2025_05_15_000001_create_working_hours_table.php
Schema::create('working_hours', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->tinyInteger('day_of_week'); // 0-6
    $table->time('opens_at')->nullable();
    $table->time('closes_at')->nullable();
    $table->boolean('is_open')->default(true);
    $table->timestamps();
    $table->unique(['user_id', 'day_of_week']);
});
```

- Se a tabela `images` não existir, crie-a para suportar uploads polimórficos. Caso contrário, reutilize a existente.
- Se o campo `avatar` não estiver em `users`, adicione via migration: `$table->string('avatar')->nullable();`.

---

#### 2. **Models & Relationships**

```php
// app/Models/WorkingHour.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkingHour extends Model
{
    protected $fillable = ['user_id', 'day_of_week', 'opens_at', 'closes_at', 'is_open'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class User extends Model
{
    public function workingHours(): HasMany
    {
        return $this->hasMany(WorkingHour::class);
    }

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
```

- **`WorkingHour`**: Relacionamento `belongsTo` com `User`.
- **`User`**: Relacionamentos `hasMany` com `WorkingHour` e `morphOne` com `Image` (para avatars).

---

#### 3. **Requests (Validação)**

```php
// app/Http/Requests/StoreWorkingHoursRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkingHoursRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'hours' => 'required|array|size:7',
            'hours.*.day_of_week' => 'required|integer|between:0,6',
            'hours.*.is_open' => 'required|boolean',
            'hours.*.opens_at' => 'nullable|date_format:H:i',
            'hours.*.closes_at' => 'nullable|date_format:H:i|after:hours.*.opens_at',
        ];
    }
}

// app/Http/Requests/UploadAvatarRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadAvatarRequest extends FormRequest
{
    public function rules(): array
    {
        return ['avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048'];
    }
}
```

- **`StoreWorkingHoursRequest`**: Garante 7 dias da semana com validações de horário.
- **`UploadAvatarRequest`**: Valida o upload de imagens (máximo 2MB).

---

#### 4. **Controllers**

##### UserWorkingHourController
```php
// app/Http/Controllers/Api/UserWorkingHourController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkingHoursRequest;
use App\Models\WorkingHour;
use Illuminate\Http\JsonResponse;

class UserWorkingHourController extends Controller
{
    public function index(int $userId): JsonResponse
    {
        $hours = WorkingHour::where('user_id', $userId)->orderBy('day_of_week')->get();
        return response()->json(['success' => true, 'data' => $hours]);
    }

    public function store(StoreWorkingHoursRequest $request, int $userId): JsonResponse
    {
        $hours = collect($request->validated()['hours'])->map(fn($h) => array_merge($h, ['user_id' => $userId]));
        WorkingHour::upsert($hours->toArray(), ['user_id', 'day_of_week'], ['opens_at', 'closes_at', 'is_open']);
        return response()->json(['success' => true, 'message' => 'Horário salvo com sucesso']);
    }
}
```

##### UserController (Upload de Avatar)
```php
// app/Http/Controllers/Api/UserController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAvatarRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function uploadAvatar(UploadAvatarRequest $request, int $id): JsonResponse
    {
        $user = $this->userService->findById($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Usuário não encontrado'], 404);
        }

        $updatedUser = $this->userService->updateAvatar($id, $request->file('avatar'));
        return response()->json([
            'success' => true,
            'message' => 'Avatar atualizado',
            'data' => ['avatar_url' => $updatedUser->avatar]
        ]);
    }
}
```

- **`UserWorkingHourController`**: Gerencia horários com `index` (listar) e `store` (atualizar em lote via `upsert`).
- **`UserController`**: Inclui método `uploadAvatar`, delegando a lógica ao serviço.

---

#### 5. **Rotas**

```php
// routes/api.php
Route::middleware(['auth:api'])->prefix('users/{user}')->group(function () {
    Route::get('/working-hours', [UserWorkingHourController::class, 'index']);
    Route::post('/working-hours', [UserWorkingHourController::class, 'store']);
    Route::post('/avatar', [UserController::class, 'uploadAvatar']);
});
```

- Rotas protegidas por autenticação, prefixadas por usuário.

---

#### 6. **Serviço (`UserService`)**

```php
// app/Services/UserService.php
namespace App\Services;

use App\Models\User;
use App\Models\WorkingHour;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function findById(int $userId): ?User
    {
        return User::find($userId);
    }

    public function upsertWorkingHours(int $userId, array $hours): void
    {
        $hours = collect($hours)->map(fn($h) => array_merge($h, ['user_id' => $userId]));
        WorkingHour::upsert($hours->toArray(), ['user_id', 'day_of_week'], ['opens_at', 'closes_at', 'is_open']);
    }

    public function updateAvatar(int $userId, UploadedFile $file): User
    {
        $user = $this->findById($userId);
        if (!$user) throw new \Exception('Usuário não encontrado');

        if ($user->image) {
            Storage::disk('public')->delete($user->image->path);
            $user->image->delete();
        }

        $path = $file->store('avatars', 'public');
        $user->image()->create(['path' => $path, 'filename' => $file->hashName()]);
        $user->avatar = Storage::disk('public')->url($path);
        $user->save();

        return $user->refresh();
    }
}
```

- **`upsertWorkingHours`**: Centraliza a lógica de upsert dos horários.
- **`updateAvatar`**: Gerencia o upload, deleção de avatar antigo e atualização do modelo.

---

#### 7. **Configuração de Disco**

```php
// config/filesystems.php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL') . '/storage',
        'visibility' => 'public',
    ],
];
```

- Execute `php artisan storage:link` para criar o link simbólico.

---

#### 8. **Frontend**

- **Horário**: Envie um array com 7 objetos para `POST /users/{id}/working-hours`.
  ```json
  {
    "hours": [
      {"day_of_week": 0, "is_open": false},
      {"day_of_week": 1, "opens_at": "08:00", "closes_at": "18:00", "is_open": true},
      // ... outros dias
    ]
  }
  ```

- **Avatar**: Use `FormData` para `POST /users/{id}/avatar`.
  ```js
  const formData = new FormData();
  formData.append('avatar', file);
  await axios.post(`/users/${userId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
  });
  ```

---

#### 9. **Permissões & Políticas**

- Crie políticas para `WorkingHour` e `Image`:
  ```php
  // app/Policies/WorkingHourPolicy.php
  class WorkingHourPolicy
  {
      public function view(User $user, WorkingHour $workingHour): bool
      {
          return $user->id === $workingHour->user_id || $user->hasRole('admin');
      }

      public function update(User $user, WorkingHour $workingHour): bool
      {
          return $user->id === $workingHour->user_id || $user->hasRole('admin');
      }
  }
  ```

- Registre no `AuthServiceProvider`:
  ```php
  Gate::resource('working-hours', WorkingHourPolicy::class);
  Gate::resource('images', ImagePolicy::class);
  ```

---

#### 10. **Melhorias Adicionais**

- **Cache**: Adicione cache para horários (`Cache::remember`).
- **Testes**: Crie testes unitários para endpoints e serviços.
- **Seeders**: Gere horários padrão para testes.

---

#### 11. **Checklist de Entrega**

1. ☐ Criar migrations e rodar `php artisan migrate`
2. ☐ Implementar modelos e relações
3. ☐ Criar requests, controllers e rotas
4. ☐ Ajustar `UserService`
5. ☐ Testar via Postman
6. ☐ Integrar no frontend
7. ☐ Documentar endpoints no README/API

Este plano oferece um **CRUD eficiente para horários** e um **upload seguro de avatars**, com validações robustas e integração polimórfica, otimizado para desempenho e escalabilidade. Se precisar de detalhes adicionais (ex.: cache ou testes), é só pedir!