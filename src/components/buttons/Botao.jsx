import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";
const BotaoAzulRoxoClaro = ({ texto, onClick }) => {
  const [btnClicado, setBtnClicado] = useState(false);

  const handleClick = () => {
    setBtnClicado(true);
    setTimeout(() => {
      setBtnClicado(false);
    }, 200);
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <>
      <button className={styles.claro} onClick={handleClick}>
        {texto}
      </button>
    </>
  );
};

export default BotaoAzulRoxoClaro;
