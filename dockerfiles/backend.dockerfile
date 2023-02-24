FROM php:8.1-fpm-alpine

RUN docker-php-ext-install pdo sockets
RUN curl -sS https://getcomposer.org/installer​ | php -- \
     --install-dir=/usr/local/bin --filename=composer

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY newsfeed-backend .
RUN composer install
CMD []