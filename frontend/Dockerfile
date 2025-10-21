FROM node:trixie-slim
WORKDIR /app
COPY package.json .
COPY server.js .
COPY dist/ ./dist
RUN npm install --production
ENTRYPOINT ["npm", "start"]
