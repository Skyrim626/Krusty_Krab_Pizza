import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import loginStyles from "./css/Login.module.css";

import backgroundImage from "../../images/wave.png";

import logo from "../../images/background.svg";
import avatar from "../../images/pizzaAvatar.svg";
import CustomerDashboard from "./CustomerDashboard";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null); // State to store the API response data

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/backend/customer-login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status) {
          // Set the data and navigate to the customer dashboard if login is successful

          setData(responseData); // Set the API response data
          console.log("The data is : ", responseData);

          navigate("/customer-dashboard", { state: responseData });
        } else {
          alert("Invalid email or password.");
        }
      } else {
        throw new Error("Error occurred during login.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  };

  const handleBack = () => {
    navigate("/");
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
            <h2 className={loginStyles.title}>Customer Login</h2>
            <div className={`${loginStyles["input-div"]} ${loginStyles.one}`}>
              <div className={loginStyles.i}>
                <FontAwesomeIcon icon={faEnvelope} color="#2c38a7" />
              </div>
              <div className={loginStyles.div}>
                <input
                  type="email"
                  className={loginStyles.input}
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            <button className={loginStyles.btn} onClick={handleBack}>
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
