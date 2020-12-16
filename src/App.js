import React, { useState } from "react";
import "./App.css";
//* Componentes
import ChatRoom from './components/ChatRoom/ChatRoom';
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
  const [user, setUser] = useState(false);
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
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
          <ProtectedRoute path="/chat" exact user={user} setUser={setUser}>
            <ChatRoom messages={messages} />
          </ProtectedRoute>
          {/* <Route path="/chat/:id" component={HomeChat} messages={messages} /> */}
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
