import React, { useState } from "react";
import "./App.css";
//* Componentes
import HomeChat from './components/HomeChat/HomeChat';

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="app">
        <HomeChat messages={messages} />
    </div>
  );
}

export default App;
