import React from 'react';
import Row from 'react-bootstrap/Row';
import img from '../../assets/img/image001.gif';
import Container from 'react-bootstrap/Container';

const DataSchema = () => {
  return (
    <Container>
      
      <Row>
        <h2>Схема данных БД "Автовокзал"</h2>
      </Row>
      <Row>
        При отправке SQL-запросов следует придерживаться следующих правил:
      </Row>
      1. Точка с запятой в конце предложения не ставится
      2. Всем вычисляемым полям необходимо явно давать имена длиной до 30 символов, например, так:
      <table>
        <tr>
          <td>
            <div className="code_box">
              <pre><code className="sql">select min(price) as minpr from km_prices</code></pre>
            </div>
          </td>
        </tr>
      </table>
      Схема данных представлена на следующем рисунке:
      <img src={img} alt='Схема данных БД "Автовокзал"'/>
      
      <ol>
        <li>km_prices (расценки за километр)</li>
        <ul>
          <li>class(класс автобуса)</li>
          <li>price (цена за км для данного класса)</li>
        </ul>
        <li>models (марки или модели автобусов)</li>
        <ul>
          <li>cod_model (код, суррогатный ключ)</li>
          <li>name_model (название, атрибут носит справочный характер)</li>
          <li>places (количество мест в автобусах данной марки)</li>
          <li>class (класс комфортности)</li>
        </ul>
        <li>buses (автобусы)</li>
        <ul>
          <li>cod_bus (код автобуса, возможно его инвентарный номер)</li>
          <li>bus_number (номер ГИБДД, атрибут носит чисто справочный характер)</li>
          <li>cod_model (марка автобуса, внешний ключ)</li>
        </ul>
        <li>points (населенные пункты)</li>
        <ul>
          <li>cod_point (код, суррогатный ключ)</li>
          <li>name_point (название)</li>
          <li>distance (расстояние от пункта отправления)</li>
        </ul>
        <li>routes (маршруты)</li>
        <ul>
          <li>cod_route (код, суррогатный ключ)</li>
          <li>name_route (название маршрута)</li>
        </ul>
        <li>points_routes (связь между пунктами и маршрутами)</li>
        <ul>
          <li>cod_point (код пункта, внешний ключ)</li>
          <li>cod_route (код маршрута, внешний ключ)</li>
        </ul>
        <li>trips (рейсы)</li>
        <ul>
          <li>cod_trip (код рейса, суррогатный ключ)</li>
          <li>week_day (день недели)</li>
          <li>hour (часы)</li>
          <li>minute (минуты)</li>
          <li>cod_route (код маршрута)</li>
          <li>cod_bus (код автобуса, назначенного на данный рейс)</li>
          <li>tickets (количество проданных билетов)</li>
        </ul>
      </ol>
      <h3>Некоторые пояснения.</h3>
      Пункты и маршруты имеют связь "Многие-ко-Многим" (через каждый пункт может проходить несколько
      маршрутов
      и
      каждый маршрут имеет несколько остановок). Для этого служит таблица-связка points_routes.
      Сущность trips (рейсы) связывает сущности Маршруты и Автобусы, дополняя их такими важными атрибутами
      как
      время отправления. Здесь же фиксируется и количество проданных билетов на каждый рейс (после
      отправления
      рейса поле обнуляется).
      Дни недели в trips - числа от 1 до 7, где 1 - понедельник, 2 - вторник и т.д.
      Номера и марки автобусов, названия маршрутов, названия населенных пунктов уникальны
      Допустимо наличие маршрутов, не используемых ни в одном рейсе. Могут быть населённые пункты, не
      используемые ни в одном маршруте, маршруты, в которые ещё не включены никакие пункты, автобусы, не
      задействованные ни в одном рейсе. Аналогично, в базе может содержаться марка автобуса, но не быть ни
      одного автобуса такой марки.
      
      <pre>
              Варианты заданий:
              №	Номера заданий
              -	-	-	-	-	-	-	-	-	-	-	-	-	-	-
              1	1	5	10	15	20	25	30	35	40	45	50	55	60	65
              2	2	6	11	16	21	26	31	36	41	46	51	56	61	66
              3	3	7	12	17	22	27	32	37	42	47	52	57	62	67
              4	4	8	13	18	23	28	33	38	43	48	53	58	63	68
              5	1	9	14	19	24	29	34	39	44	49	54	59	64	65
              6	2	5	10	15	21	27	33	38	43	45	51	57	63	69
              7	3	6	11	17	23	29	32	35	40	46	52	58	64	69
              8	4	8	12	18	22	26	31	37	42	47	53	56	62	66
              9	2	7	14	16	24	28	34	36	41	48	50	59	61	65
              10	1	9	13	15	23	27	32	38	40	45	52	57	64	68
              11	4	6	12	17	22	28	30	36	42	48	54	56	63	67
              12	3	8	11	18	21	25	31	37	42	49	50	56	60	66
              13	1	8	13	16	23	26	33	35	44	47	51	55	62	69
              14	2	5	12	15	20	28	34	38	40	46	53	59	62	68
              15	4	7	10	19	22	27	33	39	41	47	52	58	61	65
              16	2	6	13	18	24	25	32	36	44	45	53	57	64	66
              17	3	5	12	16	22	26	30	37	44	48	51	55	60	69
              18	3	7	10	16	21	25	31	37	42	49	50	56	63	67
              19	1	8	11	17	22	28	33	35	43	45	54	57	60	66
              20	2	8	14	15	23	28	32	36	40	45	53	59	64	68
              21	4	5	13	16	20	27	32	39	42	46	53	55	62	65
              22	4	9	10	17	21	25	33	35	44	45	52	59	63	66
              23	3	5	12	15	24	25	33	36	41	49	50	56	61	68
            </pre>
    
    </Container>
  )
}
export default DataSchema;