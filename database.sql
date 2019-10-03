create table users(
	userId text,
	userName text unique,
	password text,
	address text,
	phoneNumber text,
	userState integer,
	primary key(userId)
);

create table goods(
	goodsId text,
	goodsName text,
	price real,
	picture text,
	category text,
	description text,  
	goodsState integer,
	sellTime text,
	userId text,
	primary key (goodsId),
	foreign key (userId) references users
);
	
create table orders(
	orderId text,
	orderState integer,
	generateTime text,
	userId text,
	goodsId text,
	primary key (orderId),
	foreign key (userId) references users,
	foreign key (goodsId) references goods
);

create table admin(
	adminId text,
	adminName text unique,
	password text,
	primary key(adminId)
);
	