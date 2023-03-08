import "./App.css";
import { useContext } from "react";
import Location from "./apps/components/Location";
import Registration from "./apps/auth/pages/Registration";
import Login from "./apps/auth/pages/Login";
import LogOut from "./apps/auth/pages/Logout";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import Header from "./apps/components/AuthenticatedHeader";
import Footer from "./apps/components/Footer";
import { AuthContext } from "./apps/auth/auth-context/AuthContext";
import UnauthenticatedHeader from "./apps/components/UnauthenticatedHeader";
import AuthenticatedHeader from "./apps/components/AuthenticatedHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./apps/auth/routes/ProtectedRoute";
import UserFeed from "./apps/auth/views/UserFeed";
import UserMessages from "./apps/auth/views/UserMessages";
import UserMatch from "./apps/auth/views/UserMatch";
import UserTimeline from "./apps/auth/views/UserTimeline";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="/" element={<ProtectedRoute />} >
            <Route path="user-feed" element={<UserFeed/>} />
            <Route path="user-messages" element={<UserMessages/>} />
            <Route path="user-match" element={<UserMatch/>} />
            <Route path="user-timeline" element={<UserTimeline/>} />
          </Route>
      </Routes>
      <Footer />
    </div>

    // <>
    // <Header/>
    //   <div>
    //     <Outlet />
    //   </div>
    // <Footer />
    // </>
  );
}

export default App;
