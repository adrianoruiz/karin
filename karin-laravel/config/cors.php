<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000')),

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins Patterns
    |--------------------------------------------------------------------------
    |
    | Patterns for dynamic origin matching using regex.
    | This catches any localhost variation (0.0.0.0, 127.0.0.1, localhost).
    |
    */
    'allowed_origins_patterns' => [
        '#^https?://(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | This option controls whether the Access-Control-Allow-Credentials header
    | will be sent with the response. This is required for httpOnly cookies
    | to be sent across domains in authenticated requests.
    |
    | SECURITY: This must be true for httpOnly cookie authentication to work.
    |
    */

    'supports_credentials' => true,

];
