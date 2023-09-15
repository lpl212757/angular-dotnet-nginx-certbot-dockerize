# Docker Nginx with Certbot

This repository contains a Docker Compose configuration to set up a secure Nginx web server with Certbot for automatic SSL certificate management. It's a convenient way to run your web applications with HTTPS support.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Initialize Docker Compose with Nginx server:

Create a `docker-compose.yaml` file with the following content:

```yaml
version: '3'

services:
    nginx:
        image: nginx:latest
        ports:
          - 80:80
          - 443:443
```

### 2. Add Docker Config File and Volume to Nginx

Edit your docker-compose.yaml file to include a volume that links to your Nginx configuration:

```yaml
version: '3'

services:
    nginx:
        image: nginx:latest
        ports:
          - 80:80
          - 443:443
        volumes:
          - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
```

Create an nginx/default.conf file with your Nginx server configuration:

```json
server {
    listen 80;
    listen [::]:80;
}
```

### 3. Run Docker Compose and Access Nginx Welcome Page

Run the following command to start the Nginx server:

```shell
docker-compose up -d
```

You can now access the Nginx welcome page by opening a web browser and navigating to http://localhost.

### 4. Add Certbot Services to Docker Compose

Modify your docker-compose.yaml file to add Certbot services:

```yaml
version: '3'

services:
    nginx:
        image: nginx:latest
        ports:
            - 80:80
            - 443:443
        volumes:
            - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
            - ./certbot/www:/var/www/certbot/:ro
            - ./certbot/conf/:/etc/nginx/ssl/:ro
    certbot:
        image: certbot/certbot:latest
        volumes:
            - ./certbot/www/:/var/www/certbot:rw
            - ./certbot/conf/:/etc/letsencrypt/:rw
```

### 5. Modify Nginx Configuration for Certbot Verification

Update your nginx/default.conf file to include a location block for Certbot verification:

```json
server {
    listen 80;
    listen [::]:80;

    server_name loclep1.site www.loclep1.site;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://loclep1.site$request_uri;
    }
}
```

Now, you have a Dockerized Nginx server with Certbot integration for automatic SSL certificate management. Make sure to customize your Nginx configuration and domain settings as needed.

## Configuration

You can further customize the Nginx configuration by editing the nginx/default.conf file and the Certbot configuration by updating the Certbot container's volumes. Remember to reload Nginx after making configuration changes:

```shell
docker-compose exec nginx nginx -s reload
```

## Managing SSL Certificates

Certbot will automatically manage SSL certificates for your specified domain. You can check the status of certificates with:

```shell
docker-compose exec certbot certbot certificates
```

## Troubleshooting

If you encounter any issues, please refer to the troubleshooting section in the [official Certbot documentation](https://eff-certbot.readthedocs.io/en/stable/using.html#troubleshooting).
