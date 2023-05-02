"use client";
import { Context, LogoutButton } from "@/components/Clients";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { user } = useContext(Context);
  return (
    <div className="header">
      <div>
        <Link href="/">
          {" "}
          <h2 style={{ color: "white", fontWeight: "bolder" }}>Todo</h2>
        </Link>
      </div>{" "}
      <article>
        <Link href="/">Home</Link>
        {user?._id && <Link href="/profile">Profile</Link>}
        {/* <Link href="/login">Login</Link> */}
        <LogoutButton />
      </article>
    </div>
  );
};

export default Header;
