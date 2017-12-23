-- set up enviroment
https://stackoverflow.com/questions/21944936/error-1045-28000-access-denied-for-user-rootlocalhost-using-password-y

sudo mysqld_safe --skip-grant-tables
update mysql.user set authentication_string=password('25327468') where user='root';
sudo /usr/local/mysql/support-files/mysql.server start

ALTER USER 'root'@'localhost' IDENTIFIED BY '25327468';

-- add user and grant privilege.
CREATE USER 'cs542'@'%' IDENTIFIED BY 'Cs!542542';
CREATE DATABASE cs542_cars;
GRANT ALL PRIVILEGES ON cs542_cars.* TO 'cs542'@'%' WITH GRANT OPTION;

-- display user information
1. display user;
	use mysql;
	select User,Host from user;