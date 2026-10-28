########################
#   Production build   #
########################
# PHP 8.2 = versão do pool web3 (api.drakarin.com.br) no 103.199.186.46.
# O projeto não tem laravel/octane, então em vez do Octane do api-laravel-varejo
# o HTTP é servido pelo Apache + mod_php: um processo só, sem supervisor/nginx.
FROM php:8.2-apache AS production

WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    APACHE_DOCUMENT_ROOT=/var/www/html/public

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    git \
    zip \
    unzip \
    libpq-dev \
    libzip-dev \
    --no-install-recommends

# Install PHP extensions (mbstring, sodium, openssl, fileinfo etc. já vêm na imagem base)
RUN docker-php-ext-install pdo_pgsql pgsql pcntl bcmath zip opcache

# Get Composer
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# Apache: porta 9000 (padrão do api-laravel-varejo), docroot em public/ e .htaccess do Laravel.
# Traefik termina TLS; o container só fala HTTP.
RUN sed -ri 's/^Listen 80$/Listen 9000/' /etc/apache2/ports.conf && \
    sed -ri 's/<VirtualHost \*:80>/<VirtualHost *:9000>/' /etc/apache2/sites-available/000-default.conf && \
    sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf && \
    printf '<Directory ${APACHE_DOCUMENT_ROOT}>\n    Options FollowSymLinks\n    AllowOverride All\n    Require all granted\n</Directory>\nServerName localhost\nServerTokens Prod\nServerSignature Off\n' \
        > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel && \
    a2enmod rewrite headers

RUN { \
        echo 'expose_php = Off'; \
        echo 'memory_limit = 256M'; \
        echo 'upload_max_filesize = 20M'; \
        echo 'post_max_size = 25M'; \
        echo 'opcache.enable = 1'; \
        echo 'opcache.validate_timestamps = 0'; \
    } > /usr/local/etc/php/conf.d/zz-app.ini

# Dependências primeiro: um deploy que só muda código reaproveita esta camada.
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY --chown=www-data:www-data . /var/www/html

# Ensure runtime storage dirs exist and are writable (storage/logs is not tracked in git)
RUN mkdir -p storage/app/public storage/app/private \
        storage/framework/sessions storage/framework/views storage/framework/cache \
        storage/logs bootstrap/cache \
    && composer dump-autoload --optimize --no-dev \
    && php artisan package:discover --ansi \
    && php artisan storage:link \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Remove unneeded packages
RUN apt-get purge -y git zip unzip && \
    apt-get autoremove -y && \
    apt-get clean && \
    composer clear-cache && \
    rm -rf /var/lib/apt/lists/* /tmp/*

EXPOSE 9000

CMD ["apache2-foreground"]
