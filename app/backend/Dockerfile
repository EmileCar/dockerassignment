# Use the official PHP Apache base image
FROM php:7.3-apache-buster

# Copy the application code to the container
COPY . /var/www/html

# Install PHP extensions and dependencies
RUN docker-php-ext-install pdo pdo_mysql exif mbstring

RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN apt-get update && \
    apt-get install -y \
        git \
        zip \
        unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy PHP configuration files
COPY ./php/php.ini /usr/local/etc/php/conf.d/php.ini

# Copy composer.json and composer.lock into the container
COPY ./composer.json /var/www/html/composer.json

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Run Composer install
RUN composer install --no-scripts

# Set the document root
ENV APACHE_DOCUMENT_ROOT /var/www/html

# CMD to run Composer install at container startup
CMD composer install --no-scripts && apache2-foreground