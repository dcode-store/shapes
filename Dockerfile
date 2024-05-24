# pull official base image
FROM node:21-alpine3.18

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g pnpm

# install app dependencies
COPY package.json ./

COPY pnpm-lock.yaml ./
RUN pnpm install --silent
RUN pnpm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./app
WORKDIR /app

EXPOSE 3000

# start app
ENTRYPOINT ["pnpm", "start"]