import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register/Register';


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
          <ProtectedRoute path="/chat" />
          {/* <Route path="/chat/:id" component={HomeChat} messages={messages} /> */}
          <Route path="*" exact component={notFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
