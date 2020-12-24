import React, { useState } from "react";
import "./App.css";
//* Componentes
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './components/ProtectedRoute';
//* React Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


function App() {
  //! Estado global pendiente de mandar a store con redux
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
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute path="/chat" exact messages={messages} /> {/* setUser en useCallback */}
          {/* <Route path="/chat/:id" component={HomeChat} messages={messages} /> */}
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
