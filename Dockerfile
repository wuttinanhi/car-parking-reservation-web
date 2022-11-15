FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY ["package.json", "pnpm-lock.yaml", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN pnpm install --production --silent
COPY . .
RUN pnpm build
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["pnpm", "start"]
