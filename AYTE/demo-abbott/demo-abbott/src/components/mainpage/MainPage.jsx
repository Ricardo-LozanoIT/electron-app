/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./MainPage.module.scss";
import axios from "axios";

export const MainPage = () => {
  const [code, setCode] = useState(false);
  const [id, setId] = useState("");

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const getAutentication = async (id) => {
    const resp = await axios.get(
      "https://93buay9mm1.execute-api.us-east-1.amazonaws.com/Prod",
      { params: { id }}
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputsForm}>
          <div className={styles.input}>
            <span>Numero de Identificacion</span>
            <input type="text" maxLength={10} />
          </div>
        </div>
        {code ? (
          <div className={styles.container_code}>
            <span className={styles.tittle}>
              Ingrese el codigo que fue enviado a su celular o correo
            </span>
            <div className={styles.container_codeNumber}>
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
              <input type="text" maxLength={1} />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.container_button}>
          <button
            className={styles.button}
            onClick={() => getAutentication(12345)}
          >
            Ingresar
          </button>
        </div>
      </div>
    </>
  );
};
