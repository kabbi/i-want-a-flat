FROM mhart/alpine-node:base

WORKDIR /src
COPY . .

# EXPOSE 3000
CMD ["/src/node_modules/.bin/babel-node", "src/index.js"]
