"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      });
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandeler = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      {user._id ? (
        <button className="btn" onClick={logoutHandeler}>
          Logout
        </button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};

export const TodoButton = ({ id, completed }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleChecked = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(data.message);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleChecked(id)}
      />
      <button className="btn" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </>
  );
};
