import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";

function App() {
  const location = useLocation()
  return (
    <div>
      {
            location.pathname !== '/' && location.pathname !== '/form' && <Navbar/>
      }
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
