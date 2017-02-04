FROM node:6-slim

MAINTAINER hugo@exec.sh

# Set version information available for runtime
ARG VERSION
ENV VERSION $VERSION
ARG VERSION_COMMIT
ENV VERSION_COMMIT $VERSION_COMMIT
ARG VERSION_BUILD_DATE
ENV VERSION_BUILD_DATE $VERSION_BUILD_DATE

RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb &&\
    apt-get clean

# Create app directory
RUN mkdir -p /opt/make-porto-win-european-best-destination-2017
WORKDIR /opt/make-porto-win-european-best-destination-2017

# Install app dependencies
COPY package.json /opt/make-porto-win-european-best-destination-2017
RUN npm install --production

# Bundle app source
COPY src /opt/make-porto-win-european-best-destination-2017/src

COPY share/docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT [ "/entrypoint.sh" ]
