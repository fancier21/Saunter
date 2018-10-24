import React from "react";
import Paths from "./components/Paths/Paths";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Paths />
      </div>
    </div>
  );
};

export default App;
