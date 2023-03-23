import "./App.css";
import { useContext } from "react";
import Location from "./apps/components/Location";
import Registration from "./apps/pages/Registration";
import Login from "./apps/pages/Login";
import LogOut from "./apps/pages/Logout";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import Header from "./apps/components/AuthenticatedHeader";
import Footer from "./apps/components/Footer";
import { AuthContext } from "./apps/auth/auth-context/AuthContext";
import UnauthenticatedHeader from "./apps/components/UnauthenticatedHeader";
import AuthenticatedHeader from "./apps/components/AuthenticatedHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./apps/routes/ProtectedRoute";
import UserProfile from "./apps/views/UserProfile";
import UserMessages from "./apps/views/UserMessages";
import UserMatch from "./apps/views/UserMatch";
import UserTimeline from "./apps/views/User-Timeline";
import { Redirect } from "react-router-dom";

// import Logout from './apps/auth/auth-context/AuthContext';
import UnauthHome from "./apps/views/UnauthHome";

function App() {
  const { isAuthenticated, login, register, logout } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? (
        <AuthenticatedHeader logout={logout} />
      ) : (
        <UnauthenticatedHeader />
      )}
      <Routes>
        <Route index element={<UnauthHome />} />
        <Route
          path="login"
          element={<Login isAuthenticated={isAuthenticated} login={login} />}
        />
        <Route
          path="register"
          element={
            <Registration
              isAuthenticated={isAuthenticated}
              register={register}
            />
          }
        />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="user-messages" element={<UserMessages />} />
          <Route path="user-match" element={<UserMatch />} />
          <Route path="friend-stories" element={<UserTimeline />} />
          <Route path="logout" element={<LogOut />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
