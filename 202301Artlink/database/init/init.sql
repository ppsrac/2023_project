USE mysql;
FLUSH PRIVILEGES;
CREATE DATABASE artlink;
CREATE DATABASE bridge;
create user 'admin1'@'%' identified by 's09_a202_mysql';
GRANT ALL PRIVILEGES ON artlink.* TO 'admin1'@'%';
GRANT ALL PRIVILEGES ON bridge.* TO 'admin1'@'%';
FLUSH PRIVILEGES;
