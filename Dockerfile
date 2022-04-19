FROM node:17-alpine3.14 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./
RUN sass --no-source-map src/scss/main.scss src/index.css
RUN npm run build

# Production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
