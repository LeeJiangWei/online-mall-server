create table if not exists users(
	userId integer,
	userName text unique,
	password text not null,
	address text,
	phoneNumber text,
	userState integer not null,
	primary key(userId)
);

create table if not exists goods(
	goodsId integer,
	goodsName text not null,
	price real not null,
	picture text,
	category text,
	description text,
	goodsState integer not null,
	postTime text,
	userId integer not null,
	primary key (goodsId),
	foreign key (userId) references users
);

create table if not exists orders(
	orderId integer,
	orderState integer not null,
	generateTime text,
	userId integer not null,
	goodsId integer not null,
	primary key (orderId),
	foreign key (userId) references users,
	foreign key (goodsId) references goods
);
