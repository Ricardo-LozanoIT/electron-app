import React, { useState } from "react";
import icon from "../../assets/Icon-info.svg";
import error from "../../assets/error.svg";
import "./PlateFilter.css";
import axios from "axios";

export const PlateFilter = () => {
  const [badInfo, setBadInfo] = useState(false);
  const [filter, setFilter] = useState(false);
  const [plate, setPlate] = useState("");
  const [data, setData] = useState({});

  const getInformationCar = async (plateId) => {
    const resp = await axios.get(
      "https://bnd5ie842i.execute-api.us-east-1.amazonaws.com/Prod",
      { params: { plateId } }
    );
    if (resp) {
      console.log(resp.data);
      setData(resp.data);
      setFilter(true)
      return resp.data;
    } else {
      setBadInfo(true);
    }
  };

  if (data != {} && badInfo) {
    return (
      <>
        <div className="container_search">
          <img
            src={error}
            alt="error"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        {!filter ? (
          <div className="container_search">
            <div className="cont_multiSearch">
              <span className="tittle_search">Consulta vehiculo</span>
              <div className="container_inputSearch">
                <div className="select">
                  <div className="header_select">
                    <span className="option_select">Placa</span>
                  </div>
                </div>
                <input
                  className="input_search"
                  type="text"
                  minLength={3}
                  placeholder="Ingrese la placa..."
                  onChange={(value) => setPlate(value?.target?.value)}
                />
              </div>
              <button
                className="btn_search"
                onClick={() => getInformationCar(plate)}
              >
                Buscar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="cont_table">
              <div className="container_table">
                <div className="header_table">
                  <div className="info_header">Información de consulta</div>
                  <div className="container_results">
                    <div className="icon_info">
                      <img
                        src={icon}
                        alt="icon"
                        style={{ marginBottom: "4px" }}
                      />
                    </div>
                    <span className="text_result">
                      Mostrando 1 de 1 registro
                    </span>
                  </div>
                </div>
              </div>
              <div className="all_results">
                <div className="header_results">
                  <div className="item_results">
                    <span className="tittle_results">Placa</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Modelo</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Marca</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Color</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Peso</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Fecha</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Hora</span>
                  </div>
                  <div className="item_results">
                    <span className="tittle_results">Valor</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};
