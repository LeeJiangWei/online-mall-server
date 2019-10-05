create table if not exists users(
	userId integer,
	userName text unique,
	password text,
	address text,
	phoneNumber text,
	userState integer,
	primary key(userId)
);

create table if not exists goods(
	goodsId integer,
	goodsName text,
	price real,
	picture text,
	category text,
	description text,
	goodsState integer,
	postTime text,
	userId integer,
	primary key (goodsId),
	foreign key (userId) references users
);

create table if not exists orders(
	orderId integer,
	orderState integer,
	generateTime text,
	userId integer,
	goodsId integer,
	primary key (orderId),
	foreign key (userId) references users,
	foreign key (goodsId) references goods
);
