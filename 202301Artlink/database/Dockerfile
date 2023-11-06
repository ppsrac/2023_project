FROM mysql:8.0.33

ADD ./init /docker-entrypoint-initdb.d
ADD ./conf /etc/mysql/conf.d

RUN mkdir /var/log/mysql
RUN chmod 777 /var/log/mysql

EXPOSE 3306

CMD [ "mysqld" ]