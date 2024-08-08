FROM node:20-alpine AS dev

RUN apk add --no-cache bash

WORKDIR /app

RUN getent group node || addgroup --system --gid 1001 node
RUN  id -u node &>/dev/null || adduser --system --uid 1001 node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
COPY /scripts/wait-for-it.sh /opt/wait-for-it.sh
RUN chmod +x /opt/wait-for-it.sh
COPY /scripts/startup.sh /opt/startup.sh
RUN chmod +x /opt/startup.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.sh

RUN find . -path ./node_modules -prune -o -exec chown node:node {} \;

USER node

FROM node:20-alpine AS build
WORKDIR /app

RUN apk add --no-cache bash

RUN getent group node || addgroup --system --gid 1001 node
RUN  id -u node &>/dev/null || adduser --system --uid 1001 node

COPY --chown=node:node --from=dev /app/node_modules ./node_modules
COPY --chown=node:node --from=dev /opt /opt

COPY --chown=node:node . .
COPY /scripts/startup-build.sh /opt/startup-build.sh
RUN chmod +x /opt/startup-build.sh
RUN sed -i 's/\r//g' /opt/startup-build.sh

RUN npm run build
RUN npm prune --omit=dev

USER node

FROM node:20-alpine AS prod

WORKDIR /app

RUN apk add --no-cache bash

RUN getent group node || addgroup --system --gid 1001 node
RUN  id -u node &>/dev/null || adduser --system --uid 1001 node 

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
COPY --chown=node:node --from=build /opt /opt
COPY --chown=node:node --from=build /app/package*.json ./

RUN find . -path ./node_modules -prune -o -exec chown node:node {} \;

USER node

CMD ["/opt/startup-build.sh"]