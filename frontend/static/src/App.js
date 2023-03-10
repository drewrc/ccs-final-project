import "./App.css";
import { useContext } from "react";
import Location from "./apps/components/Location";
import Registration from "./apps/pages/Registration";
import Login from "./apps/pages/Login";
import LogOut from "./apps/pages/Logout";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import Header from "./apps/components/AuthenticatedHeader";
import Footer from "./apps/components/Footer";
import { AuthContext } from "./apps/auth/auth-context/AuthContext";
import UnauthenticatedHeader from "./apps/components/UnauthenticatedHeader";
import AuthenticatedHeader from "./apps/components/AuthenticatedHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./apps/routes/ProtectedRoute";
import UserFeed from "./apps/views/UserFeed";
import UserMessages from "./apps/views/UserMessages";
import UserMatch from "./apps/views/UserMatch";
import UserTimeline from "./apps/views/UserTimeline";
// import Logout from './apps/auth/auth-context/AuthContext';
import UnauthHome from "./apps/views/UnauthHome";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <Routes>
        <Route path="UnauthHome" element={<UnauthHome />}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration/>} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="user-feed" element={<UserFeed />} />
          <Route path="user-messages" element={<UserMessages />} />
          <Route path="user-match" element={<UserMatch />} />
          <Route path="user-timeline" element={<UserTimeline />} />
          <Route path="logout" element={<LogOut />} />
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
