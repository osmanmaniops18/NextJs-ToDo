import React, { Suspense } from "react";
import Form from "./addTodosForm.jsx";
import Todos from "./Todos.jsx";

const page = async () => {
  return (
    <div className="container">
      <Form />
      <Suspense fallback={<div>Loading....</div>}>
      <Todos />
      </Suspense>

    </div>
  );
};

export default page;
