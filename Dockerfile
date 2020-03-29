FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./src /www

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
