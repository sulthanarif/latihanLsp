import React from 'react'
import Head from 'next/head'
import styles from '../app/logreg.module.css'

function register() {
  const [error, setError] = React.useState(""); // for error messages
  const [msg, setMsg] = React.useState(""); // for success messages
  const [loading, setLoading] = React.useState(false); // for loading
  const [name, setName] = React.useState(""); // for name
  const [email, setEmail] = React.useState(""); // for email
  const [password, setPassword] = React.useState(""); // for password
  const [nohp, setNohp] = React.useState(""); // for nohp
  const [alamat, setAlamat] = React.useState(""); // for alamat

  return (
    <div className={styles.container}>
    <form className={styles.form}>
      <h1>Register</h1>
      <input type="text" placeholder="Username" name="username" required/>
      <input type="email" placeholder="Email" name="email" required />
      <input type="password" placeholder="Password" name="password" required/>
      <input type="submit" defaultValue="Register" />
      <p className={styles.error}>Error Message Here!</p>
      <p>
        Already have an account? <a href="login.html">Login here</a>.
      </p>
    </form>
  </div>
  
  )
}

export default register