import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Timer from "./Timer";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Pomo Timer</h1>
      <Timer />
    </>
  );
}

export default App;
