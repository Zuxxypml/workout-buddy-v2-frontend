import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/AuthContextHook";

const formInitialState = {
  email: "",
  password: "",
};
const Form = () => {
  const { dispatch } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormdata] = useState(formInitialState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    console.log(type);
    console.log(formData);
    await formRequest(formData, type);
  };
  const formRequest = async (data, reqType) => {
    const response = await fetch(
      `https://workout-buddy-api-v2.herokuapp.com/api/user/${reqType}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      return;
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: `${reqType.toUpperCase()}`, payload: json });
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const changeFormState = () => {
    setIsSignUp((prevState) => !prevState);
  };

  return isSignUp ? (
    <form className="signup" onSubmit={(e) => handleSubmit(e, "signup")}>
      <h3>Sign up </h3>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" onChange={handleChange} />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="on"
        onChange={handleChange}
      />
      <button type="submit">Sign up</button>
      <p className="p-link" onClick={changeFormState}>
        {isSignUp && "Already have an Account ? Log in"}
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  ) : (
    <form className="login" onSubmit={(e) => handleSubmit(e, "login")}>
      <h3>Login </h3>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" onChange={handleChange} />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="on"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <p className="p-link" onClick={changeFormState}>
        {!isSignUp && "New Here ? Create an account"}
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Form;
