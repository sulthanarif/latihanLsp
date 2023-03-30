import React from "react";
import Head from "next/head";
import styles from "../app/logreg.module.css";
import axios from "axios";

function login() {
  const [error, setError] = React.useState(""); // for error messages
  const [msg, setMsg] = React.useState(""); // for success messages
  const [loading, setLoading] = React.useState(false); // for loading
  const [email, setEmail] = React.useState(""); // for email
  const [password, setPassword] = React.useState(""); // for password

  const handleSubmit = async (event) => {
    // for form submission
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      }); // api call

      if (!email && !password) {
        setMsg("Please fill in all the fields.");
        setTimeout(() => setMsg(""), 5000);
        setLoading(false);
        return;
      }

      if (response.status === 200) {
        // if api call is successful
        localStorage.setItem("token", response.data.token);
        //redirect to the dashboard or home page

        console.log(response.data);
        setMsg(response.data.message);
        setTimeout(() => setMsg(""), 5000);
      }
    } catch (error) {
      // if api call is not successful
      setError(error.response.data.message);
      setTimeout(() => setError(""), 5000);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form}
      onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          autoComplete="email"
          autoFocus
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" defaultValue="Login" />
        {msg && <p>{msg}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <p>
          Don't have an account? <a href="">Register here</a>
        </p>
      </form>
    </div>
  );
}

export default login;
