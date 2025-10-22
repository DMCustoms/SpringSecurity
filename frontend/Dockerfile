FROM node:25 AS build
WORKDIR /app
COPY src/ ./src
COPY gulpfile.js .
COPY package.json .
RUN apt-get update && apt-get install -y libimagequant-dev --no-install-recommends
RUN npm install --global gulp-cli
RUN npm install
RUN gulp

FROM node:trixie-slim
WORKDIR /app
COPY --from=build /app/dist/ ./dist
COPY package.json .
COPY server.js .
RUN npm install --production
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
