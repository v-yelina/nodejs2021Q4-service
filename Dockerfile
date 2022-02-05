FROM node:16.13.1-alpine
ARG PORT
ARG WORKDIR
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]