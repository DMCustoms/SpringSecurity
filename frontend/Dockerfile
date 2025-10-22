FROM chekote/gulp:latest AS build
WORKDIR /app
COPY src/ ./src
COPY gulpfile.js .
RUN gulp

FROM node:trixie-slim
WORKDIR /app
COPY --from=build /app/dist/ ./dist
COPY package.json .
COPY server.js .
RUN npm install --production
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
