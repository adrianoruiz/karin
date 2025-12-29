FROM php:8.2-fpm

# Argumentos
ARG user=www
ARG uid=1000

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    nodejs \
    npm

# Limpar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensões PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar usuário do sistema
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar arquivos de configuração do composer primeiro (cache de camadas)
COPY composer.json composer.lock* ./

# Instalar dependências PHP (se existirem)
RUN if [ -f composer.json ]; then composer install --no-scripts --no-autoloader; fi

# Copiar resto do código
COPY --chown=$user:$user . .

# Gerar autoloader otimizado
RUN if [ -f composer.json ]; then composer dump-autoload --optimize; fi

# Usar usuário não-root
USER $user

EXPOSE 9000
CMD ["php-fpm"]
