FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/* /usr/share/nginx/html
COPY mixed_certificate.crt /etc/nginx/ssl/mixed_certificate.crt
COPY private.key /etc/nginx/ssl/private.key

EXPOSE 80 443