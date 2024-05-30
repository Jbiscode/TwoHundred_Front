FROM nginx:stable-alpine

RUN mkdir -p /etc/nginx/ssl

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
RUN pwd
COPY dist /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html
COPY mixed_certificate.crt /etc/nginx/ssl/mixed_certificate.crt
COPY private.key /etc/nginx/ssl/private.key

RUN ls -la /etc/nginx/ssl
RUN nginx -t
EXPOSE 80 443