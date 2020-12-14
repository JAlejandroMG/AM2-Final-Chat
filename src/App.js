import React, { useState } from "react";
import "./App.css";
//* Componentes
import Home from './components/Home/Home';
import HomeChat from './components/HomeChat/HomeChat';
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
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat" exact>
            <HomeChat messages={messages} />
          </Route>
          {/* <Route path="/chat/:id" component={HomeChat} messages={messages} /> */}
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
