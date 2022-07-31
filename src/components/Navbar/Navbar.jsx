import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/AuthContextHook";

function Navbar() {
  const { dispatch } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
}

export default Navbar;
