#!/bin/sh
sleep 15
php artisan migrate:fresh
php artisan db:seed
/usr/sbin/php-fpm7.3 -O
