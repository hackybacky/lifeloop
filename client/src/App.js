
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Route,Link,Switch, useHistory} from "react-router-dom";
import {Signin} from './components/screens/signin';
import {Home} from './components/screens/home';
import {Signup} from './components/screens/signup';
import {Profile} from './components/screens/profile';
import { Createpost } from './components/screens/createpost'
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialstate, reducer } from './reducers/userReducers';

export const UserContext= createContext();

const Routing =()=>{
        const history=useHistory()
        useEffect(()=>{

          const user=JSON.parse(localStorage.getItem("user"))
          if(user){
            history.push("/")
          }
          else history.push("/signin")
        },[])
                return  (

            <Switch>


              <Route exact path="/"><Home/></Route>
              <Route exact path="/signup"><Signup/></Route>
              <Route exact path="/signin"><Signin/></Route>
              <Route exact path="/profile"><Profile/></Route>
              <Route exact path="/createpost"><Createpost/></Route> 

            </Switch>



         );
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value ={{state,dispatch}}>
   <BrowserRouter>

        <Navbar/>
        <Routing/>
   </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
