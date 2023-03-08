import "./App.css";
import Location from "./apps/components/Location";
import Registration from "./apps/auth/pages/Registration";
import Login from "./apps/auth/pages/Login";
import LogOut from "./apps/auth/pages/Logout";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import Header from "./apps/components/Header";
import Footer from "./apps/components/Footer";

function App() {
  return (
    <>
    <Header/>
      <div>
        <Outlet />
      </div>
    <Footer />
    </>
  );
}

export default App;
