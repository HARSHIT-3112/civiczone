import { useState } from "react";
import { register } from "../services/api";

export default function Register({ setPage }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [msg,setMsg]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({email,password,name});
      setMsg("Registered! Please login.");
      setTimeout(()=>setPage("login"),1200);
    } catch (err) {
      setMsg("Register failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400, margin:"20px auto"}}>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      <button type="submit">Register</button>
      <p>{msg}</p>
    </form>
  );
}
