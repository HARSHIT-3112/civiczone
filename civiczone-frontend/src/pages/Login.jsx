import { useState } from "react";
import { login } from "../services/api";

export default function Login({ setToken }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({email,password});
      setToken(data.access_token);
    } catch (e) {
      setErr("Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400, margin:"20px auto"}}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      <button type="submit">Login</button>
      {err && <p style={{color:"red"}}>{err}</p>}
    </form>
  );
}
