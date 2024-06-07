import Logo from "./assets/icons/logoAbbott.png";
import foot from "./assets/icons/abbottFooter.png";
import { MainPage } from './components/mainpage/MainPage'
import "./App.css";

function App() {
  return (
    <>
      <div className='header'>
        <img src={Logo} alt="logo" />
      </div>
      <MainPage /> 
      <div className='footer'>
        <img src={foot} alt="logo" />
      </div>
    </>
  );
}

export default App;
