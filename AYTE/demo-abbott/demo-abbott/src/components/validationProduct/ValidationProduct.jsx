/* eslint-disable */
import { useState } from "react";
import ensure from "../../assets/ensure.png";
import pedialyte from "../../assets/pedialyte.png";
import styles from "./ValidationProduct.module.scss";
import axios from "axios";

export const ValidationProduct = ({ product, id }) => {
  const [productCant, setProductCant] = useState("");
  const [visitorName, setVisitorName] = useState("");

  const postInformation = async (id) => {
    const resp = await axios.put(
      "https://93buay9mm1.execute-api.us-east-1.amazonaws.com/Prod",
      { count: productCant, name: visitorName, product },
      { params: { id }, headers: { 'Content-Type': 'application/json'}}
    );
    console.log(resp?.data?.message);
  };

  const productRegister = (product) => {
    switch (product) {
      case "ensure":
        return <img src={ensure} />;
      case "pedialyte":
        return <img src={pedialyte} />;
      default:
        return "producto no encontrado";
    }
  };

  return (
    <>
      <div className={styles.image_product}>{productRegister(product)}</div>
      <div className={styles.container_info}>
        <div className={styles.inputsForm}>
          <div className={styles.input}>
            <span>ingresa la cantidad recibida</span>
            <input
              type="text"
              maxLength={1}
              onChange={(value) => setProductCant(value?.target?.value)}
            />
          </div>
        </div>
        <div className={styles.inputsForm}>
          <div className={styles.input}>
            <span>Nombre visitador</span>
            <input
              type="text"
              onChange={(value) => setVisitorName(value?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.container_button}>
        <button className={styles.button} onClick={() => postInformation(id)}>
          Enviar
        </button>
      </div>
    </>
  );
};
