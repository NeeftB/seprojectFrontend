import React, {useEffect} from 'react';
import './App.css';
import Mainpage from './components/mainpage'
import Login from './components/login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/register';
import { useState } from 'react';
import Header from './components/header'
import UserPersonal from './components/user-personal';
import UserBlogs from './components/user-blogs';
import EditBlog from './components/blog-edit'
import NewBlog from './components/blog-new';
import BlogOverview from './components/blog-overview';

const routes = [
  //Login route wordt in de code toegevoegd ivm properties
  {
    path: "/",
    exact: true,
    component: <Mainpage />
  },
  {
    path: "/blog",
    component: <BlogOverview />
  },
  {
    path: "/register",
    component: <Register />
  },
  {
    path: "/user",
    exact: true,
    component: <UserPersonal />
  },
  {
    path: "/user/blogs",
    exact: true,
    component: <UserBlogs />
  },
  {
    path: "/user/blogs/edit",
    exact: true,
    component: <EditBlog /> 
  },
  {
    path: "/user/blogs/new",
    exact: true,
    component: <NewBlog />
  }
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} routes={routes} />
        <Switch>
          <Route path="/login" render={props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={route.component}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
