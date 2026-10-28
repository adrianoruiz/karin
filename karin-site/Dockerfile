# syntax=docker/dockerfile:1
# Site drakarin.com.br — Nuxt 4 gerado estático (`nuxt generate`, preset static) e servido por nginx.
# Só a parte pública: server/ (better-auth, Postgres) e /admin não entram no build estático.

FROM node:22-alpine AS build
# O lockfile mantido é o bun.lock (package-lock.json está fora de sincronia com o package.json).
COPY --from=oven/bun:1.2.18-alpine /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
# Valores públicos (vão pro HTML/JS); nunca passar segredo aqui.
ARG NUXT_PUBLIC_APP_URL=https://www.drakarin.com.br
ARG NUXT_PUBLIC_API_URL=https://api.drakarin.com.br/api/
ARG NUXT_PUBLIC_WHATSAPP_PHONE=5547991259577
ENV NUXT_PUBLIC_APP_URL=$NUXT_PUBLIC_APP_URL \
    NUXT_PUBLIC_API_URL=$NUXT_PUBLIC_API_URL \
    NUXT_PUBLIC_WHATSAPP_PHONE=$NUXT_PUBLIC_WHATSAPP_PHONE
# server/database/index.ts lança erro no import sem DATABASE_URL, e o prerender carrega o Nitro.
# URL fictícia só pra subir o prerender: nenhuma página pública consulta o banco.
RUN DATABASE_URL=postgres://build:build@127.0.0.1:5432/build npm run generate

FROM nginx:alpine
# Mesmas regras do vhost atual no ISPConfig (redirects do routeRules, noindex no /admin, 404 próprio).
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    # Location relativo: atrás do Traefik (TLS) o nginx não sabe que o esquema é https.
    absolute_redirect off;

    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_vary on;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml image/svg+xml;

    error_page 404 /error/404.html;

    location = /especialidades { return 301 /$is_args$args; }
    location ^~ /especialidades/ { return 301 /$is_args$args; }
    location = /blog { return 301 /$is_args$args; }
    location ^~ /blog/ { return 301 /$is_args$args; }
    location ^~ /admin { add_header X-Robots-Tag "noindex, nofollow" always; try_files $uri $uri/index.html =404; }

    location ^~ /_nuxt/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    location ~* \.(?:woff2?|ttf|otf|eot)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    location ~* \.(?:png|jpe?g|webp|avif|gif|svg|ico)$ {
        add_header Cache-Control "public, max-age=2592000";
        try_files $uri =404;
    }

    location / {
        add_header Cache-Control "no-cache";
        try_files $uri $uri/index.html $uri/ =404;
    }
}
NGINX
COPY --from=build /app/.output/public /usr/share/nginx/html
EXPOSE 80
