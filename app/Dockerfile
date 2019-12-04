# base image
FROM node:latest

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . /app/package.json
RUN npm install 
# start app
CMD ["npm", "start"]