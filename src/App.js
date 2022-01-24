import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './App.scss';
import Header from './components/Header';
import Categories from './features/Categories';
import Login from './features/Login';
import Register from './features/Register';

function App() {

  const token = useSelector(state => state.user.token);

  const Task = React.lazy(() => import('./features/Tasks'));

  return (
    <div className="App">

      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          {token ? <Header /> : ""}
          {token ?
            (<Switch>
              <Route path="/tasks">
                <Task />
              </Route>
              <Route path="/categories">
                <Categories />
              </Route>
              <Redirect to="/tasks" />
            </Switch>)
            : (
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Redirect to="/login" />
              </Switch>
            )}
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
