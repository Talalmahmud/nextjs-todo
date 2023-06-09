import React, { Suspense } from "react";
import Form from "./addTodoForm";
import Todos from "./todos";

const Home = async () => {
  return (
    <div className="container">
      {" "}
      <Form />
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Loading...
          </div>
        }
      >
        <Todos />
      </Suspense>
    </div>
  );
};

export default Home;
