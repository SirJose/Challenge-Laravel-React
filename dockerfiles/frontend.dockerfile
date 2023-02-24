FROM node:14-alpine as build

WORKDIR /app

COPY newsfeed-frontend/package.json /app

RUN npm install

COPY newsfeed-frontend . 

RUN npm run build

FROM nginx:stable-alpine

# Copy from the previous stage
# STAGE SOURCE DESTINY
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]