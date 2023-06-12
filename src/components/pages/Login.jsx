import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import loginStyles from "./css/Login.module.css";

import backgroundImage from "../../images/wave.png";

import logo from "../../images/background.svg";
import avatar from "../../images/pizzaAvatar.svg";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.status) {
          navigate("/dashboard");
        } else {
          alert("Invalid username or password.");
        }
      } else {
        throw new Error("Error occurred during login.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  };

  return (
    <>
      <img className={loginStyles.wave} src={backgroundImage} alt="Wave" />
      <div className={loginStyles.container}>
        <div className={loginStyles.img}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={loginStyles["login-content"]}>
          <form onSubmit={handleSubmit}>
            <img src={avatar} alt="Avatar" />
            <h2 className={loginStyles.title}>Welcome</h2>
            <div className={`${loginStyles["input-div"]} ${loginStyles.one}`}>
              <div className={loginStyles.i}>
                <FontAwesomeIcon icon={faUser} color="#2c38a7" />
              </div>
              <div className={loginStyles.div}>
                <input
                  type="text"
                  className={loginStyles.input}
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className={`${loginStyles["input-div"]} ${loginStyles.one}`}>
              <div className={loginStyles.i}>
                <FontAwesomeIcon icon={faLock} color="#2c38a7" />
              </div>
              <div className={loginStyles.div}>
                <input
                  type="password"
                  className={loginStyles.input}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" className={loginStyles.btn} value="Login" />
          </form>
        </div>
      </div>
    </>
  );
}
