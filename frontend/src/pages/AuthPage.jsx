import React, { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/auth/register" : "/auth/login";
      const res = await API.post(url, form);
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem("yt_token", token);
      alert("Authentication successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h2>{isRegister ? "Create account" : "Sign in"}</h2>
        {isRegister && <input placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />}
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" className="primary">{isRegister ? "Register" : "Sign in"}</button>
        <button type="button" onClick={() => setIsRegister(!isRegister)} className="link">
          {isRegister ? "Already have an account? Sign in" : "Create account"}
        </button>
      </form>
    </div>
  );
}

