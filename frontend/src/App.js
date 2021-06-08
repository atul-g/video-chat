import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Meet from './Meet'
import Error from './Error'

function App() {
  return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/meet/:meetid'>
                    <Meet />
                </Route>
                <Route path='*'>
                    <Error />
                </Route>
            </Switch>
        </Router>
  );
}

export default App;
