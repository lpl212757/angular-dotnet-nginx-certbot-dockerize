FROM node:18.15.0-alpine3.16 as build

WORKDIR ./app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .
RUN npm run build:prod

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
