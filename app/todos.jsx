import React from "react";
import { cookies } from "next/headers";
import { TodoItem } from "@/components/ServerComponents";

const fetchTodo = async (token) => {
  try {
    const res = await fetch("http://localhost:3000/api/mytask", {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) return [];
    return data.task;
  } catch (error) {
    return [];
  }
};
const Todos = async () => {
  const token = cookies().get("token")?.value;

  const tasks = await fetchTodo(token);
  return (
    <section className="todosContainer">
      {tasks?.map((item, index) => {
        return (
          <TodoItem
            key={index}
            title={item.title}
            description={item.description}
            id={item._id}
            completed={item.isCompleted}
          />
        );
      })}
    </section>
  );
};

export default Todos;
