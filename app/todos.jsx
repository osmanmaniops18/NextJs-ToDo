import { ToDoItems } from "@/components/ServerComponents";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const todoData = async (token) => {
  try {
    const resp = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });

    const data = await resp.json();
    console.log(data);
    if (!data.success) {
      return [];
    }
    return data.tasks;
  } catch (error) {
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return redirect("/login");
  const data = await todoData(token);
  return (
    <section className="todosContainer">
      {data?.map((item) => (
        <ToDoItems
          title={item.title}
          descrption={item.descrption}
          id={item._id}
          key={item._id}
          completed={item.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;
