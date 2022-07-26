create table Vouchers (
	code varchar(10),
	voucherValue integer,	
	taken bool,	
	primary key (code)
);

create table AirdropTransactions (
	id serial,
	transactionDate date,
	airdropVal integer,
	userID integer,
	email text,
	wallet text,
	primary key (id)
);

create table AirdropTransactions (
	id serial,
	transactionDate date,
	airdropVal integer,
	userID integer,
	email text,
	wallet text,
	primary key (id)
);

create table AirdropTransactions (
	id serial,
	transactionDate date,
	airdropVal integer,
	userID integer,
	email text,
	wallet text,
	primary key (id)
);

create table Users (
    id serial,
    email text,
    password text,
    primary key (id)
);