import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import CreateUser from './components/CreateUser';
import UpdatePass from './components/UpdatePass';
import { BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import Polls from './components/Polls';
import CreatePoll from './components/CreatePoll';
import PollOptions from './components/PollOptions';
import UpdatePoll from './components/UpdatePoll';
import UpdatePollOptions from './components/UpdatePollOptions';
import CreatePollOption from './components/CreatePollOption';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component = {Login}></Route>
        <Route exact path="/" component = {Home}></Route>
        <Route exact path="/createUser" component = {CreateUser}></Route>
        <Route exact path="/profile" component = {Profile}></Route>
        <Route exact path="/updatePass" component = {UpdatePass}></Route>
        <Route exact path="/polls" component = {Polls}></Route>
        <Route exact path="/createPoll" component = {CreatePoll}></Route>
        <Route exact path="/pollOptions/:id" component = {PollOptions}></Route>
        <Route exact path="/updatePoll/:id" component = {UpdatePoll}></Route>
        <Route exact path="/updateOption/:id" component = {UpdatePollOptions}></Route>
        <Route exact path="/createPollOption/:id" component = {CreatePollOption}></Route>

      </Switch>
    </Router>
  );
}

export default App;
