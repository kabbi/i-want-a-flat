FROM mhart/alpine-node:base

WORKDIR /src
COPY . .

CMD ["/src/node_modules/.bin/babel-node", "src/index.js"]
