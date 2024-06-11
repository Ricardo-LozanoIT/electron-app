/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./MainPage.module.scss";
import axios from "axios";
import { ValidationProduct } from "../validationProduct/ValidationProduct";

export const MainPage = () => {
  const [code, setCode] = useState(false);
  const [id, setId] = useState("");
  const [codeNumber, setCodeNumber] = useState("");
  const [validateCode, setValidateCode] = useState(false);

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const productRegister = params.product;

  const getAutentication = async (id) => {
    const resp = await axios.get(
      "https://93buay9mm1.execute-api.us-east-1.amazonaws.com/Prod",
      { params: { id } }
    );
    console.log(resp?.data?.allow);
    setCode(resp?.data?.allow);
  };

  const getValidateCode = async (id, code) => {
    const resp = await axios.get(
      "https://93buay9mm1.execute-api.us-east-1.amazonaws.com/Prod/code",
      { params: { id, code } }
    );
    console.log(resp?.data?.allow, validateCode);
    setValidateCode(resp?.data?.allow);
    if (resp?.data?.allow) {
      alert("Bienvenido a Abbott");
    } else {
      alert("codigo ingresado incorrecto");
    }
  };

  return validateCode ? (
    <>
      <ValidationProduct product={productRegister} />
    </>
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.inputsForm}>
          <div className={styles.input}>
            <span>Numero de Identificacion</span>
            <input
              type="text"
              maxLength={10}
              onChange={(value) => setId(value?.target?.value)}
            />
          </div>
        </div>
        {code ? (
          <div className={styles.container_code}>
            <span className={styles.tittle}>
              Ingrese el codigo que fue enviado a su correo
            </span>
            <div className={styles.container_codeNumber}>
              <input
                type="text"
                maxLength={6}
                onChange={(value) => setCodeNumber(value?.target?.value)}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.container_button}>
          {!code ? (
            <button
              className={styles.button}
              onClick={() => getAutentication(id)}
            >
              Ingresar
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => getValidateCode(id, codeNumber)}
            >
              Validar
            </button>
          )}
        </div>
      </div>
    </>
  );
};
