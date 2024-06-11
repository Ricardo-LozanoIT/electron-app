/* eslint-disable react/prop-types */
import ensure from "../../assets/ensure.png";
import pedialyte from "../../assets/pedialyte.png";
import styles from "./ValidationProduct.module.scss";

export const ValidationProduct = ({ product }) => {
  console.log(product);
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
              //onChange={(value) => setId(value?.target?.value)}
            />
          </div>
        </div>
        <div className={styles.inputsForm}>
          <div className={styles.input}>
            <span>Nombre visitador</span>
            <input
              type="text"
              //onChange={(value) => setId(value?.target?.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
