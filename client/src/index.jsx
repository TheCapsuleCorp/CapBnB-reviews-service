import React from 'react';
import ReactDOM from 'react-dom';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';

const DEFAULT_ROOM_ID = '11111111';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path={`/rooms/:roomId`}>
        <App />
      </Route>
      <Route exact path={'/'}>
        <Redirect to={`/rooms/${DEFAULT_ROOM_ID}`} />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('app'),
);
