"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    // Dummy Login untuk Testing SUS
    if (email === "pemilik@test.com" && password === "123456") {
      localStorage.setItem("isLogin", "true"); // ✅ TAMBAHAN
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "User Pemilik",
          role: "pemilik",
        })
      );

      router.push("/pemilik/dashboard");
      return;
    }

    if (email === "kontraktor@test.com" && password === "123456") {
      localStorage.setItem("isLogin", "true"); // ✅ TAMBAHAN
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "User Kontraktor",
          role: "kontraktor",
        })
      );

      router.push("/kontraktor/dashboard");
      return;
    }

    alert("Email atau password salah");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-title">
          <h1>Masuk</h1>
          <p>Selamat datang kembali</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}