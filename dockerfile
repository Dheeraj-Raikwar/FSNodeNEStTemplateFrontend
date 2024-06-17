FROM node:18.17.1
 
WORKDIR /usr/app
 
COPY . .
 
RUN npm install
 
RUN npm run build
 
EXPOSE 3000
 
CMD ["npm", "start" ]
 
# Launch app with PM2
#CMD [ "pm2-runtime", "start", "npm", "--", "start" ]