<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Sobre o Projeto Karin Laravel

Este é o backend do sistema Karin, desenvolvido com Laravel. Ele fornece uma API completa para gerenciamento de usuários, horários, agendamentos, e outras funcionalidades.

### Funcionalidades Principais

- Autenticação JWT
- Gerenciamento de usuários e perfis
- Gerenciamento de especialidades
- Gestão de horários de funcionamento
- Upload de avatares
- Agendamentos e consultas
- Configurações de IA e chatbot

### Novas Funcionalidades

#### Horários de Funcionamento

O sistema agora suporta o gerenciamento completo de horários de funcionamento para clínicas e profissionais:

- Configuração para cada dia da semana (domingo a sábado)
- Definição de horário de abertura e fechamento
- Possibilidade de marcar dias como fechados
- Validação automática dos dados

Documentação: `docs/users_api_guide.md` - Seção "Gerenciamento de Horários de Funcionamento"

#### Upload de Avatar

Implementamos um sistema de upload de imagens de perfil:

- Suporte para formatos JPG, JPEG, PNG e WebP
- Limite de tamanho de 2MB
- Armazenamento otimizado
- Geração automática de URLs públicas

Documentação: `docs/users_api_guide.md` - Seção "Upload de Avatar"

## Documentação da API

A documentação completa da API está disponível em:

- `docs/users_api_guide.md`: Guia de uso da API de usuários
- `postman_tests/working_hours_avatar.md`: Exemplos de testes das novas funcionalidades

## Instalação e Configuração

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/karin-laravel.git

# Instalar dependências
composer install

# Configurar o arquivo .env
cp .env.example .env
php artisan key:generate

# Executar migrações
php artisan migrate

# Criar link simbólico para armazenamento
php artisan storage:link

# Iniciar o servidor
php artisan serve
```

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
