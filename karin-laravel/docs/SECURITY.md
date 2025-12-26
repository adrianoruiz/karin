# Documentacao de Seguranca - Karin Laravel Backend

Este documento descreve as melhorias de seguranca implementadas no backend Laravel do sistema medico Karin Gestor.

## Resumo das Melhorias

### 1. Autenticacao via httpOnly Cookies

**Problema Resolvido:** Vulnerabilidade XSS - tokens JWT armazenados em localStorage podiam ser roubados por scripts maliciosos.

**Solucao Implementada:**
- Tokens JWT agora sao enviados em cookies httpOnly
- JavaScript nao consegue acessar os cookies
- Cookie flags de seguranca: `httpOnly`, `secure` (producao), `sameSite=lax`

**Arquivos Modificados:**
- `app/Http/Controllers/Api/AuthController.php` - Atualizado para enviar tokens em cookies
- `app/Http/Middleware/JwtCookieAuthentication.php` - Novo middleware para extrair token do cookie

**Compatibilidade:**
- Modo legacy mantido (token no body) para migracao gradual
- Frontend pode usar `use_cookie: true` para ativar modo seguro

### 2. Middleware de Autenticacao via Cookie

**Arquivo:** `app/Http/Middleware/JwtCookieAuthentication.php`

**Funcionalidades:**
- Extrai token JWT do cookie httpOnly
- Injeta no header Authorization para compatibilidade com guard JWT
- Prioriza cookie sobre header (mais seguro)
- Tratamento de erros com mensagens padronizadas

**Uso:**
```php
// Em routes/api.php
Route::middleware('jwt.cookie')->group(function () {
    // Rotas protegidas
});
```

### 3. Configuracao CORS

**Arquivo:** `config/cors.php`

**Configuracoes de Seguranca:**
```php
'supports_credentials' => true,  // Necessario para cookies cross-origin
'allowed_origins' => env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000'),
```

**Variaveis de Ambiente:**
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://seudominio.com
```

### 4. Tratamento de Excecoes JWT

**Arquivo:** `bootstrap/app.php`

**Erros Tratados:**
- `TokenExpiredException` - Token expirado (401)
- `TokenInvalidException` - Token invalido (401)
- `JWTException` - Erro generico de autenticacao (401)
- `NotFoundHttpException` - Recurso nao encontrado (404)

**Formato de Resposta:**
```json
{
    "success": false,
    "error": "token_expired",
    "message": "Token expirado. Por favor, faca login novamente."
}
```

### 5. Validacoes Brasileiras

**Arquivos:**
- `app/Rules/BrazilianCpf.php` - Validacao completa de CPF com digitos verificadores
- `app/Rules/BrazilianPhone.php` - Validacao de telefone fixo/celular brasileiro
- `app/Rules/BrazilianCep.php` - Validacao de CEP com 8 digitos

**Uso em FormRequests:**
```php
use App\Rules\BrazilianCpf;
use App\Rules\BrazilianPhone;
use App\Rules\BrazilianCep;

public function rules(): array
{
    return [
        'cpf' => ['required', new BrazilianCpf],
        'phone' => ['required', new BrazilianPhone],
        'zip' => ['required', new BrazilianCep],
    ];
}
```

### 6. FormRequests de Autenticacao

**Arquivos:**
- `app/Http/Requests/Auth/LoginRequest.php`
- `app/Http/Requests/Auth/RegisterRequest.php`

**Funcionalidades:**
- Validacao robusta de email (RFC + DNS)
- Validacao de senha com requisitos de complexidade
- Sanitizacao automatica de entrada (trim, lowercase email)
- Mensagens de erro em portugues

### 7. FormRequests de Usuario Atualizados

**Arquivos:**
- `app/Http/Requests/User/StoreUserRequest.php`
- `app/Http/Requests/User/UpdateUserRequest.php`
- `app/Http/Requests/User/StoreCompleteUserRequest.php`

**Melhorias:**
- Validacao de nome com regex (apenas letras, espacos, apostrofos e hifens)
- Validacao de email com RFC + DNS
- Validacao de senha com complexidade (letras + numeros)
- Validacao de telefone brasileiro
- Validacao de CPF com digitos verificadores
- Validacao de CEP
- Sanitizacao automatica de dados

## Configuracao do Ambiente

### Desenvolvimento (.env)

```env
APP_ENV=local
APP_DEBUG=true

# CORS para desenvolvimento
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Sessao
SESSION_DRIVER=database
SESSION_DOMAIN=localhost
SESSION_SECURE_COOKIE=false

# JWT
JWT_TTL=43200  # 30 dias em minutos
```

### Producao (.env.production)

```env
APP_ENV=production
APP_DEBUG=false

# CORS para producao
CORS_ALLOWED_ORIGINS=https://seudominio.com,https://app.seudominio.com

# Sessao segura
SESSION_DRIVER=database
SESSION_DOMAIN=.seudominio.com
SESSION_SECURE_COOKIE=true

# JWT com expiracao mais curta
JWT_TTL=1440  # 24 horas em minutos
```

## API de Autenticacao

### Login

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
    "email": "usuario@exemplo.com",
    "password": "senha123",
    "use_cookie": true
}
```

**Response (modo cookie):**
```json
{
    "success": true,
    "data": {
        "token_type": "bearer",
        "expires_in": 86400,
        "user": {
            "id": 1,
            "name": "Usuario",
            "email": "usuario@exemplo.com",
            "roles": [...]
        }
    }
}
```
- Cookie `jwt_token` enviado automaticamente

**Response (modo legacy):**
```json
{
    "success": true,
    "data": {
        "access_token": "eyJ...",
        "token_type": "bearer",
        "expires_in": 86400,
        "user": {...}
    }
}
```

### Logout

**Endpoint:** `POST /api/auth/logout`

**Response:**
```json
{
    "success": true,
    "message": "Deslogado com sucesso"
}
```
- Cookie `jwt_token` removido automaticamente

### Refresh Token

**Endpoint:** `POST /api/auth/refresh`

**Response:** Mesmo formato do login

## Logs de Auditoria

O sistema agora registra eventos de seguranca:

- **Login bem-sucedido:** user_id, IP
- **Login falhou:** email, IP, user_agent
- **Logout:** user_id, IP
- **Refresh token falhou:** erro, IP
- **Novo usuario registrado:** user_id, email, IP

## Migracao do Frontend

### Passo 1: Habilitar Modo Cookie

No frontend Nuxt, atualizar o servico de API:

```typescript
// services/api.ts
const apiService = {
    async login(credentials: LoginCredentials) {
        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                ...credentials,
                use_cookie: true  // Habilitar modo seguro
            },
            credentials: 'include'  // Importante para cookies cross-origin
        });
        return response;
    }
};
```

### Passo 2: Remover localStorage

Apos habilitar cookies, remover armazenamento de token em localStorage:

```typescript
// stores/auth.ts
// Remover:
// localStorage.setItem('token', token);

// O token agora esta no cookie httpOnly
```

### Passo 3: Configurar Credentials

Todas as requests autenticadas devem incluir credentials:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.API_URL || 'http://localhost:8000/api'
        }
    }
});

// Em $fetch ou useFetch
const response = await $fetch(url, {
    credentials: 'include'
});
```

## Proximos Passos Recomendados

1. **Rate Limiting:** Implementar rate limiting nos endpoints de autenticacao
2. **2FA:** Adicionar autenticacao de dois fatores
3. **Audit Trail:** Expandir logs para acoes sensveis no sistema medico
4. **Encrypted Fields:** Criptografar campos sensiveis no banco (dados medicos)
5. **Security Headers:** Adicionar headers de seguranca (CSP, HSTS, etc.)

## Checklist de Seguranca

- [x] httpOnly cookies para JWT
- [x] Secure flag em producao
- [x] SameSite=Lax para prevencao basica de CSRF
- [x] CORS configurado com credentials
- [x] Validacao robusta de entrada
- [x] Sanitizacao de dados
- [x] Tratamento padronizado de erros
- [x] Logs de auditoria
- [x] Validacoes brasileiras (CPF, telefone, CEP)
- [ ] Rate limiting
- [ ] 2FA
- [ ] Criptografia de campos sensiveis
- [ ] Security headers

## Contato

Para duvidas sobre seguranca, entre em contato com a equipe de desenvolvimento.
