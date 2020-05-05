create table deck (
	id serial primary key,
	name varchar(160) not null unique,
	"memorizeSize" smallint not null default 50,
	"testSize" smallint not null default 50,
	"streakSize" smallint not null default 5,
	"createdAt" timestamp with time zone not null default current_timestamp,
	"updatedAt" timestamp with time zone not null default current_timestamp
);

create table card ( 
	id serial primary key,
	input text not null,
	front text not null,
	back text not null,
	streak smallint not null default 0,
	"testByFront" boolean not null default false,
	"deckId" integer references deck(id) on delete restrict,
	"createdAt" timestamp with time zone not null default current_timestamp,
	"updatedAt" timestamp with time zone not null default current_timestamp
);
