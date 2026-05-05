FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-slim AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/server/entry.mjs"]
