# CLAUDE.md
SEMPRE RESPONDA EM PT-BR pq o programador é brasileiro.
nome de classes, metodos e variaveis faça tudo em ingles.
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Environment Setup
```bash
# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
```

### Development Server
```bash
# Start all development services (server, queue, logs, vite)
composer dev

# Individual services
php artisan serve              # Start Laravel server
php artisan queue:listen       # Start queue worker
php artisan pail              # Start log viewer
npm run dev                   # Start Vite development server
```

### Database Operations
```bash
php artisan migrate           # Run migrations
php artisan migrate:fresh     # Fresh migration
php artisan db:seed          # Run seeders
php artisan migrate:fresh --seed  # Fresh migration with seeders
```

### Testing
```bash
php artisan test             # Run all tests
php artisan test --filter=UserTest  # Run specific test
vendor/bin/phpunit           # Alternative test runner
```

### Code Quality
```bash
./vendor/bin/pint            # Format code with Laravel Pint
php artisan route:list       # List all routes
```

## Architecture Overview

### Multi-Tenant Healthcare Management System
This Laravel 12 application manages three types of healthcare providers:
- **clinica_medica**: Medical clinics
- **clinica_odonto**: Dental clinics  
- **salao_beleza**: Beauty salons

### Core Architecture Patterns

#### 1. Multi-Tenancy Structure
- Company-based data segregation via `company_id`
- Role-based access control (RBAC) with custom roles
- Tenant isolation in queries and services

#### 2. Service Layer Pattern
Key services located in `app/Services/`:
- `ChatbotService`: AI message management with 10-minute caching
- `PromptService`: Dynamic AI prompt generation
- `AppointmentQueryService`: Complex appointment availability queries
- `UserService`: User lifecycle and relationship management

#### 3. Repository Pattern
- `UserRepository`: Abstracted data access layer
- Separation between controllers and direct database access

#### 4. Factory Pattern
- `PromptGeneratorFactory`: Creates business-type specific prompt generators
- Different AI prompt strategies for medical, dental, and beauty contexts

### Database Design

#### Core Entities
- **Users**: Multi-role system (patients, doctors, clinics, admins)
- **Appointments**: Full appointment lifecycle with availability checking
- **Companies**: Multi-tenant structure via CompanyCliente/CompanyUser
- **Specialties**: Medical specializations with many-to-many user relationships
- **AI Configurations**: Chatbot and prompt management system

#### Key Relationships
- Polymorphic: Address and Image models relate to Users
- Many-to-many: Users ↔ Roles, Users ↔ Specialties, Users ↔ PaymentMethods
- Tenant isolation: Most models filtered by company_id

### API Structure

#### Authentication (JWT)
- Extended token lifetime (300 days)
- `/api/auth/login`, `/api/auth/register`, `/api/auth/me`

#### Core Business APIs
- User management: `/api/users` (CRUD operations)
- Appointments: `/api/appointments`, `/api/patient/available-times`
- AI/Chatbot: `/api/ai-config`, `/api/chatbots/message-type`
- Working hours: `/api/users/{user}/working-hours`

### AI Integration

#### Dynamic Prompt System
- Business-type specific prompt generators in `app/Services/PromptGenerators/`
- Context-aware AI responses based on healthcare provider type
- WhatsApp integration for automated patient communication

#### Caching Strategy
- 10-minute cache duration for chatbot messages
- Redis-based caching for performance optimization

### Security Features
- JWT authentication with extended lifetime
- Role-based authorization with granular permissions
- Soft deletes for audit trails
- Request validation via FormRequest classes

### File Structure Notes
- Controllers organized by API domain in `app/Http/Controllers/Api/`
- Business logic in `app/Services/` directory
- Eloquent models with complex relationships in `app/Models/`
- Enums for type safety in `app/Enum/`
- Reusable functionality in `app/Traits/`

### Development Workflow
- Use `composer dev` for concurrent development (runs server, queue, logs, Vite)
- API documentation available in `docs/` directory
- Postman collections for API testing
- TailwindCSS + Vite for frontend asset compilation

### Multi-Language Support
- Portuguese (pt_BR) localization
- AI responses support multiple languages
- Localized validation messages