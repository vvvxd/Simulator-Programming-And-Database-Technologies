import axios from "axios";
import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import img from '../assets/img/sql-svgrepo-com.svg';

const Welcome = (props) => {
  const [quotes, setQuotes] = useState("");
  
  useEffect(() => {
    if (quotes === "") {
      axios.get("https://type.fit/api/quotes").then((response) => {
        setQuotes(response.data);
      });
    }
  }, [quotes]);
  
  return (
      < div style={{
        textAlign:"center"
      }}>
        <h2>
          Базы данных. SQL
        </h2>
        <h2>
          Научись манипулировать реляционными данными, построй карьеру в IT и в аналитике, отточи навыки работы с SQL запросами.
        </h2>
        <img
          src={img}
          width="572"
          height="840"
          alt="brand"
        />
      </div>
  );
};

export default Welcome;
