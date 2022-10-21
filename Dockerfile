FROM node:alpine
WORKDIR /home/node/app
COPY . /home/node/app
ENV NODE_ENV=production
RUN chmod -r node:node /home/node/app
CMD ["node", "-r" , "dotenv/config" , "src/app.js"]
EXPOSE 8443
