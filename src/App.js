import './App.css';
import Forcast from './components/Forcast';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BasicInfo from './components/BasicInfo';

function App() {

  return (
    <div><Router>
      <Switch>
        <Route exact path="/">
          <BasicInfo />
        </Route>

        <Route path="/forcast">
          <Forcast />
        </Route>

      </Switch>
    </Router></div>
  );
}

export default App;
