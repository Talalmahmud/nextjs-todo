"use client";

import { Context } from "@/components/Clients";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login App",
  description:
    "This is the login todo app. You can add and modify your daily todos.",
};

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {}
  };
  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Login</button>
          <span>OR</span>
          <Link
            href="/register"
            style={{
              backgroundColor: "rgb(83, 51, 51)",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            New User
          </Link>
        </form>
      </section>
    </div>
  );
};

export default page;
