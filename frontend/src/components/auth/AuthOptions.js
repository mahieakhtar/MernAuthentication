import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  let history = useHistory();
  const register = () => {
    history.push("./register");
  };
  const login = () => {
    history.push("./login");
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>register</button>
          <button onClick={login}>login</button>
        </>
      )}
    </nav>
  );
}

export default AuthOptions;
