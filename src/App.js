import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register/Register';
import ChatRoom from './components/ChatRoom/ChatRoom';
import PrivateChatRoom from './components/ChatRoom/PrivateChatRoom';


function App() {
  //+ Crear las rutas
  //{ /chat/:id (protegida)

  const notFound = () => ( <h2>404 Not Found</h2> )

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
          <ProtectedRoute path="/chat"  exact>
            <ChatRoom />
          </ProtectedRoute>
          <Route path="/chat/:id">
            <PrivateChatRoom />
          </Route>
          {/* <Route path="/chat/:id" component={HomeChat} messages={messages} /> */}
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
