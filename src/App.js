import React, { useState } from "react";
import "./App.css";
//* Componentes
import ChatRoom from './components/ChatRoom/ChatRoom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
//* React Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


function App() {
  const [messages, setMessages] = useState([]);

  //+ Crear las rutas
//{ /chat/:id (protegida)

  const notFound = () => (
    <h2>404 Not Found</h2>
  )

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat" exact>
            <ChatRoom messages={messages} />
          </Route>
          {/* <Route path="/chat/:id" component={HomeChat} messages={messages} /> */}
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
