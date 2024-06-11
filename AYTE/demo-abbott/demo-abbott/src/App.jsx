/* eslint-disable no-unused-vars */
import Logo from "./assets/icons/logoAbbott.png";
import foot from "./assets/icons/abbottFooter.png";
import { MainPage } from "./components/mainpage/MainPage";
import { Abbott } from "./components/LinksPage/Abbott";
import "./App.css";

function App() {
  const router = window.location.pathname;
  console.log(router);
  const userData = {
    avatar: "https://via.placeholder.com/120",
    name: "Links about Abbott",
    links: [
      {
        label: "Inserto o caja",
        url: "https://www.medicine.abbott/content/dam/epd/medicine/ar/documents/primary_care/DAYAMINERAL.pdf",
      },
      {
        label: "Preguntas frecuentes",
        url: "https://www.latam.abbott/products/pharmaceuticals.html",
      },
      {
        label: "My a:care en App Store",
        url: "https://apps.apple.com/co/app/my-a-care/id1438136251",
      },
      {
        label: "My a:care en play store",
        url: "https://play.google.com/store/apps/details?id=com.abbott.epd.acare.patienthealthapp&hl=es&gl=US",
      },
    ],
  };
  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" />
      </div>
      {router != "/link" ? (
        <MainPage />
      ) : (
        <Abbott
          avatar={userData.avatar}
          name={userData.name}
          links={userData.links}
        />
      )}
      <div className="footer">
        <img src={foot} alt="logo" />
      </div>
    </>
  );
}

export default App;
