"use client";

import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const Profile = () => {
  const { user } = useContext(Context);
  if (!user._id) return redirect("/login");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
