import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Login from './components/Login/Login';
import PrivateChatRoom from './components/ChatRoom/PrivateChatRoom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register/Register';



function App() {
  const notFound = () => ( <h2 className="error_404">404 Not Found</h2> )
  
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
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}



export default App;
