create table points(
  cod_point integer not null,
  name_point varchar2(20) not null,
  distance integer not null,
constraint point_pk primary key (cod_point)
);

create table routes (
  cod_route integer not null,
  name_route varchar2(20) not null,
constraint route_pk primary key (Cod_Route)
);

create table points_routes (
  cod_point integer not null,
  cod_route integer not null,
constraint point_route_pk primary key (cod_point, cod_route),
constraint point_route_point_fk foreign key (cod_point)
 references points(cod_point),
constraint point_route_fk foreign key (cod_route)
 references routes(cod_route)
);

create table km_prices (
  class integer not null,
  price number(4,2) not null,
constraint km_prices_pk primary key (class)
);

create table models (
  cod_model integer not null,
  name_model varchar2(20) not null,
  places integer not null,
  class integer not null,
constraint model_pk primary key (cod_model),
constraint km_prices_fk_class  foreign key (class)
 references km_prices(class)
);

create table buses (
  cod_bus integer not null,
  bus_number varchar2(20) not null,
  cod_model integer not null,
constraint bus_pk primary key (cod_bus),
constraint bus_model_fk foreign key (cod_model)
 references models(cod_model)
);


create table  trips (
  cod_trip integer not null,
  week_day integer not null,
  hour integer not null,
  minute integer not null,
  tickets integer not null,
  cod_route integer not null,
  cod_bus integer not null,
constraint trip_pk primary key (cod_trip),
constraint trip_bus_fk foreign key (cod_bus)
 references buses(cod_bus),
constraint trip_route_fk foreign key (cod_route)
 references routes(cod_route)
);

