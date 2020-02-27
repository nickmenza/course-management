## CSS FRAMEWORK
* https://fezvrasta.github.io/bootstrap-material-design/

## วิธีการติดตั้ง
* ลง Docker
* cd ไปยัง folder
* ใส่คำสั่ง docker-compose up -d รอสักพักเมื่อรันสำเร็จแล้ว
* docker-compose exec php-fpm php artisan migrate คำสั่งนี้รันเพื่อสร้างฐานข้อมูล
* docker-compose exec php-fpm php artisan db:seed คำสั่งนี้รันเพื่อจำลองข้อมูล

* http://localhost:8080/ สำหรับเข้าเว็บไซด์
* http://localhost:8001/ สำหรับเข้าฐานข้อมูล
    username : root
    password : 123456

* ถ้าจะ login เข้าใช้งาน ไปยัง table user หยิบสัก 1 username มาใช้งานได้เลย
* สำหรับ password ในการเข้าใช้คำว่า password ทุก user

