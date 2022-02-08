FROM node:15.5.0-buster-slim

WORKDIR /app
COPY random-image-tweet.js package.json package-lock.json ./


RUN npm ci
CMD ["node", "index.js"]
