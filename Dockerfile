FROM node:boron

MAINTAINER Raphael Lima <raphael.aolima8@gmail.com>

RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3
USER postgres
RUN /etc/init.d/postgresql start
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf
EXPOSE 5432
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]
USER root
RUN /etc/init.d/postgresql stop
RUN /etc/init.d/postgresql start
RUN psql -h localhost -U postgres
RUN psql -c "ALTER USER postgres WITH PASSWORD 'pgroot'";
RUN psql -c "CREATE DATABASE api OWNER postgres"
RUN psql -c 'CREATE TABLE "Users" (id serial NOT NULL, "name" character varying (255), "email" character varying (255), "password" character varying(255), "createdAt" timestamp with time zone NOT NULL, "updatedAt" timestamp with time zone NOT NULL);'

# USER root
RUN mkdir -p /usr/src/ts-api
WORKDIR /usr/src/ts-api

COPY package.json /usr/src/ts-api
RUN npm install

COPY . /usr/src/ts-api
EXPOSE 4000
CMD npm run watch
