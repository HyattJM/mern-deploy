import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // Fetching message from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      <h2>{message}</h2>
      <h3>{message}</h3>
      <h4>{message}</h4>
      <h5>{message}</h5>
    </div>
  );
}

export default App;