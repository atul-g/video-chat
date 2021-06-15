import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home'
import Meet from './Meet'
import Error from './Error'

import './App.css'

function App() {
  return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>

                <Route path='/meet/:meetId' children={<Meet />}>
                </Route>

                <Route path='*'>
                    <Error />
                </Route>
            </Switch>
        </Router>
  );
}

export default App;
