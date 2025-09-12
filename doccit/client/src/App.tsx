import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import SubredditPage from './pages/SubredditPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/r/:subreddit" component={SubredditPage} />
      </Switch>
    </Router>
  );
};

export default App;