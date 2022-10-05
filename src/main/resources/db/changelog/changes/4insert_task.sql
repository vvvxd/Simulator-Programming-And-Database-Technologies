-- REM INSERTING into EXPORT_TABLE
-- SET DEFINE OFF;
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('4','select p.name_point
from points p join points_routes pr on p.cod_point = pr.cod_point join routes r
on pr.cod_route = r.cod_route where r.name_route = ''Вологда-Череповец''
order by p.distance ','03 - Остановки Вологда-Череповец','303','Названия всех пунктов маршрута Вологда-Череповец в порядке следования',null,'5','41','46');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('2','select name_point from points where distance<=20 order by name_point','01 - Ближние места','289','Требуется найти названия всех пунктов, расстояние до которых не более 20 км. Названия выведите в алфавитном порядке.','402','11','46','57');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('3','
SELECT bus_number
FROM models m, buses b
where (m.name_model)=''Икарус'' and m.cod_model=b.cod_model
ORDER BY bus_number','02 - Номера "Икарусов"','302','Номера всех автобусов марки Икарус, вывести в лексикографическом порядке',null,'78','454','532');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('5','select distinct name_route from routes inner join points_routes on points_routes.cod_route=routes.cod_route
inner join points on points.cod_point=points_routes.cod_point where points.name_point=''Шексна''','04 - Маршруты через Шексну','304','Названия всех маршрутов, которые проходят через Шексну, в алфавитном порядке',null,'45','644','689');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('6','select t.hour, t.minute from trips t join routes r on t.cod_route=r.cod_route
where t.week_day=1 and r.name_route=''Вологда-Череповец''
order by 1,2','05 - Рейсы Вологда-Череповец, понедельник','305','Время отправления всех рейсов по маршруту Вологда-Череповец в понедельник по возрастанию',null,'78','452','530');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('7','select name_point from points
where name_point like ''Ч%''
order by 1','06 - Пункты "Ч"','306','Названия всех пунктов, которые начинаются с буквы Ч, вывести в алфавитном порядке','451','54','450','504');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('8','select name_point from points
where name_point like ''_____''
order by 1','07 - 5-пункты','307','Названия всех пунктов, которые состоят из пяти букв, вывести в алфавитном порядке',null,'24','545','569');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('9','select p.name_point from
points p
where upper(p.name_point) like ''%О%''
order by p.name_point asc','08 - Пункты с "О"','308','Названия всех пунктов, в которых есть хотя бы одна буква О (без учета регистра), вывести в алфавитном порядке',null,'24','454','478');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('10','SELECT distinct bus_number
FROM trips t JOIN buses b ON  b.cod_bus=t.cod_bus
WHERE t.week_day>=6
ORDER BY bus_number','09 - Автобусы в выходные','309','Номера всех автобусов, которые задействованы в выходные дни (суббота и воскресенье) в лексикографическом порядке',null,'45','785','830');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('11','select cod_trip, name_route, hour, minute from trips t JOIN  routes r ON t.cod_route=r.cod_route
where week_day=7 and hour<12
ORDER BY hour, minute','10 - Рейсы в воскресенье до 12','310','Коды рейсов с указанием названий маршрутов и времени отправления в воскресенье до 12 часов, в порядке возрастания времени',null,'42','457','499');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('12','select name_route, routes.cod_route from routes inner join points_routes
on points_routes.cod_route=routes.cod_route inner join points
on points.cod_point=points_routes.cod_point where name_point=''Шексна''
order by name_route','11 - Маршруты через Шексну - 2','311','Названия и коды всех маршрутов, которые проходят через Шексну, в алфавитном порядке',null,'45','782','827');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('13','select hour,minute,name_route from trips join routes
on trips.cod_route=routes.cod_route
join points_routes on points_routes.cod_route=trips.cod_route
 join points on points.cod_point=points_routes.cod_point
where trips.week_day=1 and name_point like ''Сокол'' order by hour,minute;','12 - В понедельник через Сокол','312','Время отправления всех рейсов (часы, минуты) и называния маршрутов для всех рейсов в понедельник, которые проходят через Сокол, в порядке возрастания времени',null,'87','422','509');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('14','select (places-tickets) as sv from models, buses, trips
where models.cod_model=buses.cod_model and buses.cod_bus=trips.cod_bus and trips.cod_trip=2
','13 - Свободных мест на второй рейс','313','Сколько свободных мест имеется на рейс с кодом 2',null,'86','741','827');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('15','SELECT max (kp.price*n.distance) as m
from trips a, models m, buses b,km_prices kp,points_routes pr, points n
where a.cod_trip = 2 and a.cod_route = pr.cod_route and pr.cod_point = n.cod_point and a.cod_bus = b.cod_bus and b.cod_model = m.cod_model and m.class = kp.class','14 - Макс. цена билета на 2-й рейс','314','Максимальная цена билета на рейс с номером 2',null,'45','785','830');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('16','select Count (*) as c from models Join buses On models.cod_model=buses.cod_model
where name_model=''Икарус''','15 - Сколько "Икарусов"?','315','Количество автобусов марки Икарус',null,'42','785','827');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('17','select Count (*) as c from models Join buses On models.cod_model=buses.cod_model
where class=1','16 - Первоклассные автобусы','316','Количество автобусов 1 класса',null,'4','75','79');
Insert into TASKS (ID,REFERENCE_QUERY,TITLE,SERIAL_NUMBER,DESCRIPTION,QUERY_HISTORY_ID,DECIDED_RIGHT,DECIDED_WRONG,TOTAL_ATTEMPTS) values ('18','select Count (*) as c from routes','17 - Число маршрутов','317','
Общее количество маршрутов',null,'96','785','881');