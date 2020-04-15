import React from 'react';

import Home from './components/Home/Home';
import Startchat from './components/Startchat/Startchat';
import Privatechat from './components/Privatechat/Privatechat';



import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route exact path="/privatechat" component={Privatechat} />
      <Route exact path="/chat" component={Startchat} />
    </Router>

  );
}

export default App;