import { useDispatch } from "react-redux";
import Button from "../Button";
import "font-awesome/css/font-awesome.min.css";
import { type AppDispatch } from "../../Store";
import React, { useState } from "react";
import { login } from "../../Store/reducers/auth";

const FormLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email, password })).unwrap();

      localStorage.setItem("token", result.token);
      clearInput();
    } catch (err) {
      console.log(err);
    }
  };

  const clearInput = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email"
          />
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            id="senha"
          />
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div>
        <Button children="LOGIN" type="submit" />
      </form>
    </>
  );
};

export default FormLogin;
