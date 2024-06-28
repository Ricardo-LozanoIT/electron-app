import React, { useState } from "react";
import "./InfoForm.css";
import axios from "axios";

export const Infoform = () => {
  const [showValue, setShowValue] = useState(false);
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrant] = useState("");
  const [color, setcolor] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [value, setValue] = useState("");

  const setValueForm = () => {
    setShowValue(true);
  };

  const cleanInputs = () => {
    const plateBlanks = document.getElementsByClassName("input_text");
    let plateBlanksArray = Array.from(plateBlanks);
    plateBlanksArray.forEach((element) => (element.value = ""));
  };

  const getAutentication = async (data, plateId) => {
    console.log(date, time);
    const resp = await axios.post(
      "https://bnd5ie842i.execute-api.us-east-1.amazonaws.com/Prod",
      {
        model: data.model,
        brand: data.brand,
        color: data.color,
        weight: data.weight,
        date: data.date,
        hour: data.time,
        pricing: data.value,
      },
      { params: { plateId } }
    );
    console.log(resp);
    //setCode(resp?.data?.allow);
  };

  return (
    <>
      <div style={{ paddingTop: "20px" }}>
        <div className="container_page">
          <div className="container_form">
            <div className="info_form">
              <div className="info_tittle">Datos del Vehiculo</div>
              <div className="container_inputs">
                <div className="input_form">
                  <input
                    className="input_text"
                    id="placa"
                    type="text"
                    minLength={5}
                    placeholder="Placa"
                    autoComplete="false"
                    onChange={(value) => setPlate(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="text"
                    minLength={5}
                    placeholder="Modelo"
                    onChange={(value) => setModel(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="text"
                    minLength={5}
                    placeholder="Marca"
                    onChange={(value) => setBrant(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="text"
                    minLength={5}
                    placeholder="Color"
                    onChange={(value) => setcolor(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="text"
                    minLength={5}
                    placeholder="Peso"
                    onChange={(value) => setWeight(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="date"
                    minLength={5}
                    placeholder="Fecha"
                    onChange={(value) => setDate(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="time"
                    minLength={5}
                    placeholder="Hora"
                    onChange={(value) => setTime(value?.target?.value)}
                  />
                </div>
                <div className="input_form">
                  <input
                    className="input_text"
                    type="text"
                    minLength={5}
                    placeholder="Valor"
                    onChange={(value) => setValue(value?.target?.value)}
                  />
                </div>
              </div>
              <div className="container_buttons">
                <button className="btn_clean" onClick={() => cleanInputs()}>
                  Limpiar
                </button>
                <button
                  className="btn_weight"
                  onClick={() =>
                    getAutentication(
                      {
                        model,
                        brand,
                        color,
                        weight,
                        date,
                        time,
                        value,
                      },
                      plate
                    )
                  }
                >
                  Pesar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
