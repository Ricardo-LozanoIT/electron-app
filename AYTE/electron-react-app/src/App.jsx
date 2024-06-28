import React from "react";
import user from "./assets/user.svg";
import notification from "./assets/notification.svg";
import "./App.css";
import { Infoform } from "./components/InfoForm/Infoform.jsx";
import { PlateFilter } from "./components/filterPlate/PlateFilter.jsx";

export const App = () => {
  return (
    <>
      <div className="header">
        <span className="tittle_user">User 4001778 (colombia)</span>
        <img src={user} alt="user" />
        <img src={notification} alt="notification" />
        <button>Cerrar sesión</button>
      </div>
      <div className="container">
        <div className="container_actionPage">
          <div className="action_page">
            <span className="tittle_page">GESTIÓN BASCULA</span>
          </div>
        </div>

        <Infoform />
        <PlateFilter />
      </div>
      {/* <div className="footer"></div> */}
    </>
  );
};
