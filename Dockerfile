FROM node:22.2.0-alpine AS build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build -- --configuration production

FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/credit-score-web/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
