USE cs542_cars;

DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS car;
DROP TABLE IF EXISTS model;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS password;


CREATE TABLE `password` (
  `PID` int(11) NOT NULL,
  `password` int(11) DEFAULT NULL,
  PRIMARY KEY (`PID`),
  UNIQUE KEY `PID_UNIQUE` (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `company` (
  `companyid` int(11) NOT NULL,
  `companyname` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`companyid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `model` (
  `modelid` int(11) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `body` varchar(20) DEFAULT NULL,
  `img` CHAR(10),
  `videolink` TEXT, 
  `summary` TEXT,
  PRIMARY KEY (`modelid`),
  KEY `companyid_idx` (`companyid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `car` (
  `carid` int(11) NOT NULL,
  `modelid` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `registration` varchar(5) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `engV` float DEFAULT NULL,
  `engType` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `drive` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`carid`),
  KEY `modelid_idx` (`modelid`),
  CONSTRAINT `modelid` FOREIGN KEY (`modelid`) REFERENCES `model` (`modelid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `customer` (
  `CID` int(11) NOT NULL,
  `CNAME` varchar(45) DEFAULT NULL,
  `ZIP` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`CID`),
  CONSTRAINT `cid` FOREIGN KEY (`CID`) REFERENCES `password` (`PID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `employee` (
  `EID` int(11) NOT NULL,
  `NAME` varchar(20) DEFAULT NULL,
  `SSN` varchar(20) DEFAULT NULL,
  `BUDGET` float DEFAULT NULL,
  `GROUP` int(11) DEFAULT NULL,
  PRIMARY KEY (`EID`),
  UNIQUE KEY `EID_UNIQUE` (`EID`),
  CONSTRAINT `eid` FOREIGN KEY (`EID`) REFERENCES `password` (`PID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `manager` (
  `MID` int(11) NOT NULL,
  PRIMARY KEY (`MID`),
  UNIQUE KEY `MID_UNIQUE` (`MID`),
  CONSTRAINT `mid` FOREIGN KEY (`MID`) REFERENCES `employee` (`EID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

source insert_password.sql;
source insert_company.sql;
source insert_model.sql;
source insert_car.sql;
source insert_customer.sql;
source insert_employee.sql;
source insert_manager.sql;
