# PIA HOMEWORK 2

## Redis Kullanım Alanları

1- Caching: Yüksek performanslı in memory bir veritabanı olarak özellikle web uygulamalarında sık kullanılan sorgu sonuçları, statik sayfalar vb. dataları cachlemek için kullanılır

2- Pub/Sub sistemi: Çeşitli servisler ya da uygulamalar arasında gerçek zamanlı iletişimi sağlamak amacıyla kullanılabilir.

3- Queue: Redis queue olarak da kullanılabilir. Örneğin uzun sürebilecek asenkron işlemlerin belirli bir queue içerisinde arka planda yapılmasını sağlamak için kullanılabilir.

## RabbitMQ Kullanım Alanları

1- Uygulamalar arasında mesajlaşma altyapısı sağlar. Aralarındaki iletişimi asenkron hale getirerek birbirleriyle bağımlılıklarını azaltır.

2- Uzun sürecek arka planda yapılması daha uygun işler için bir istek sunucuya ulaştığında isteği alan servis isteği işleyecek servisle RabbitMQ aracılığıyla iletişim kurup işlemin bitmesini beklemeden yanıt verebilir böylelikle kullanıcı işlem hakkında uzun süre beklemek zorunda kalmaz.

3- Otomatik ölçeklenme sağlayabilir. Örneğin bir message queue'da yoğun zamanlarda çok fazla mesaj birikiyorsa RabbitMQ sayesinde yeni consumerlar ayağa kaldırılabilir ve queue'nun daha hızlı şekilde işlenmesini sağlayarak işlemlerin yavaşlamasını ya da tıkanmasını engelleyebiliriz.

## Docker Ödevi Açıklama

### PostgreSQL, Node.js ve Nginx

- http://localhost:5000 adresinden ulaşılabilir.
- http://localhost:5000/api adresinden swagger dökümantasyonuna ulaşılabilir.
- Tüm ürünleri dönen bir endpoint ve tek tek ürünleri almamızı sağlayan stoğu düşüren bir endpoint vardır.
- Node.js yapısından ve typescriptten js'ye compile olduğu için image'in boyutunu düşük tutabilmek amacıyla Multi Stage Build kullanılmıştır.
- docker compose up komutuyla çalıştırılabilir.
