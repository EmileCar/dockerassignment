# Use the official MariaDB image
FROM mariadb:10.5.9

COPY . /var/lib/mysql

# Set the environment variables
ENV MYSQL_DATABASE=ksaoosterzele
ENV MYSQL_ROOT_PASSWORD=example
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=example

# Expose the MySQL port
EXPOSE 3306
