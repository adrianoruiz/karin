# Task: Implement Specialties Feature (Many‑to‑Many with Users)

> **Objective**
> Add a `specialties` resource to the system and relate it to `users` so each user can have multiple specialties appropriate to their `segment_type` (`clinica-medica`, `salao-beleza`, `clinica-odonto`).

---

## 1 – Database Layer

| #   | Action                                             | Details / Acceptance                                                                                                                                                                 |
| --- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.1 | Create migration **`create_specialties_table`**    | Columns: `id` (PK), `name` (string, unique), `segment_type` (enum: `clinica-medica`, `salao-beleza`, `clinica-odonto`), `status` (boolean, default =true), timestamps & soft‑deletes |
| 1.2 | Create migration **`create_specialty_user_table`** | Pivot with `specialty_id`, `user_id` both FK, plus timestamps. Add composite unique \[user\_id, specialty\_id].                                                                      |
| 1.3 | Run `php artisan migrate`                          | No errors.                                                                                                                                                                           |

## 2 – Eloquent Models

| #                                                                                                                    | Action                     | Details                                                                |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| 2.1                                                                                                                  | Generate `Specialty` model | `php artisan make:model Specialty -m` (will already exist from step 1) |
| 2.2                                                                                                                  | Model setup                | ▪ `fillable = ['name','segment_type','status']`                        |
| ▪ `casts = ['status'=>'boolean']`                                                                                    |                            |                                                                        |
| ▪ Relation: `public function users(): BelongsToMany { return $this->belongsToMany(User::class)->withTimestamps(); }` |                            |                                                                        |
| 2.3                                                                                                                  | Update `User` model        | Add:                                                                   |

````php
public function specialties(): BelongsToMany
{
    return $this->belongsToMany(Specialty::class)->withTimestamps();
}
```|

## 3 – Seeders & Factories

| # | Action | Details |
|---|--------|---------|
|3.1|Factory for `Specialty`|`php artisan make:factory SpecialtyFactory` – generate random names per segment.
|3.2|Seeder|`php artisan make:seeder SpecialtySeeder` – insert canonical specialties grouped by each `segment_type`.
|3.3|DatabaseSeeder|Call `SpecialtySeeder`.

## 4 – Validation & Form Requests

* Create `StoreSpecialtyRequest` / `UpdateSpecialtyRequest` validating `name` (string|max:120 unique:specialties), `segment_type` (in enum list), `status` (boolean).

## 5 –  HTTP Layer (API)
PODE SER UMA API RESOURCE 
| # | Endpoint | Verb | Description |
|---|----------|------|-------------|
|5.1|`/api/specialties`|GET|List specialties (optionally filter by `segment_type`).|
|5.2|`/api/specialties`|POST|Create (admin only).|
|5.3|`/api/specialties/{id}`|PUT|Update.|
|5.4|`/api/specialties/{id}`|DELETE|Soft‑delete.|
|5.5|`/api/users/{user}/specialties`|GET|List user specialties.|
|5.6|`/api/users/{user}/specialties`|POST|Sync specialties: expects array `specialty_ids[]`.|

> **Note:** protect endpoints with policies: only admins update specialties; users may update their own list.

## 6 – Business Logic

* When user signs up, show specialties dropdown fed by their `segment_type`.
* On profile update, validate that selected specialties belong to the same `segment_type` as the user.

## 7 – Front‑End Changes

1. **Dropdown Component**
   * Fetch `/api/specialties?segment_type={segment_type}`.
   * Allow multi‑select (e.g., Vue‑Multiselect).
2. **Profile Screen**
   * Show selected specialties as tags.

## 8 – Testing

| Layer | Test |
|-------|------|
|PHPUnit|Model relations, scope filter by `segment_type`, syncing specialties with user.
|Feature|Authorized CRUD on specialties, attach/detach route.
|Dusk|User profile flow selecting specialties according to `segment_type`.

## 9 – Documentation

* Update API docs (`OpenAPI.yaml` or README) with new endpoints and examples.
* Add migration & seeder notes to `docs/deployment.md`.

## 10 – Deployment Checklist

- [ ] Migrate production DB
- [ ] Seed specialties (`--class=SpecialtySeeder`)
- [ ] Clear caches (`config`, `route`, `view`)
- [ ] Deploy front‑end bundle

---

### Estimated Effort
| Role | Hours |
|------|-------|
|Backend dev|6–8|
|Frontend dev|4–6|
|QA|3|
|**Total**|~15|

---

**Done‑Criteria**
- Users can select & save specialties limited to their segment.
- Admin can manage master list of specialties.
- API and UI tested & documented.

````
