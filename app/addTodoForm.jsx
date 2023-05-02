"use client";
import { Context } from "@/components/Clients";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

export const metadata = {
  title: "Add todo",
  description:
    "This is the add todo app. You can add and modify your daily todos.",
};

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(Context);
  const router = useRouter();

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      router.refresh();
    } catch (error) {
      return toast.error(data.message);
    }
  };

  if (!user._id) return redirect("/login");
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>
    </div>
  );
};

export default Form;
