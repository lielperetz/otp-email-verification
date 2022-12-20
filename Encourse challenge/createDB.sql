CREATE DATABASE Encourse_SQL
GO

USE Encourse_SQL
GO

CREATE TABLE Users(
username varchar(50),
email varchar(50) unique,
otp varchar(6),
otp_time varchar(50))
