"use client";

import { Context } from "@/components/Clients";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

export const metadata = {
  title: "Register App",
  description:
    "This is the register todo app. You can add and modify your daily todos.",
};

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.newuser);
      toast.success(data.message);
    } catch (error) {
      return toast.error(data.message);
    }
  };
  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form onSubmit={signupHandler}>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

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
          <button type="submit">Sign Up</button>
          <span>OR</span>
          <Link
            href="/login"
            style={{
              backgroundColor: "rgb(83, 51, 51)",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            Sign In
          </Link>
        </form>
      </section>
    </div>
  );
};

export default page;
