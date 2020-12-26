import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

import "./Home.css";

export default function Home() {
  const { userData } = useContext(UserContext);
  console.log("User", userData);
  let users = userData.user;
  return (
    <>
      <div className="page">
        {users ? (
          <h1>Welcome {users.displayName} !!!</h1>
        ) : (
          <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
          </>
        )}
      </div>
    </>
  );
}
