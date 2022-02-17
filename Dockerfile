FROM node:15.5.0-buster-slim

WORKDIR /app
COPY index.js package.json package-lock.json ./


RUN npm ci
CMD ["node", "index.js"]
