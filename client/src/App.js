import './App.css';
import AddLogin from './components/AddLogin';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginFind from './components/LoginFind';
import Main from './components/Main';
import Header from './components/Header';
import BoardWrite from './components/BoardWrite';
import BoardRead from './components/BoardRead';
import BoardDetail from './components/BoardDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Switch>

          <Route exact path="/">
            <Main></Main>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/loginAdd">
            <AddLogin></AddLogin>
          </Route>
          <Route path="/loginFind">
            <LoginFind></LoginFind>
          </Route>
          <Route path="/boardWrite">
            <BoardWrite></BoardWrite>
          </Route>
          <Route path="/boardRead">
            <BoardRead></BoardRead>
          </Route>
          <Route path="/boardDetail">
            <BoardDetail></BoardDetail>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
