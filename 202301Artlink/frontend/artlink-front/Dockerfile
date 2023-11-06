FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /app
RUN mkdir ./dist
COPY --from=builder /app/dist /app/dist
COPY ./nginx/default.conf /etc/nginx/conf.d
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]

