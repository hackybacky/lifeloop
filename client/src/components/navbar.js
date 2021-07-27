import react, { useContext } from "react";
import jquery from "jquery"
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function  Navbar(){
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const Render =()=>{
            console.log(JSON.stringify(state));
          if(localStorage.getItem("user")){
                return [
                  <>      
                            <Link  className="nav-link active" to="/profile" >Profile</Link>
                                 <Link  className="nav-link active" to="/createpost" >CreatePost</Link>

                            <Link>
                                <button className="btn-sm btn-info"
                                  onClick={
                                    ()=>{
                                    
                                      localStorage.clear()
                                      history.push('/signin')
                                      window.location.reload()
                                      toast("Logout successfull")
                                    }
                                  }
                                >Logout</button>
                            </Link>
                  </>
                ]
          }
          else{
            return [
              <>
                                <Link  className="nav-link active" to="/signup">Signup</Link>
                              <Link className="nav-link active" to="/signin">Signin</Link>    
              </>
            ]
          }
    }
  
                return (

                    <div >
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid ">
    <Link className="navbar-brand" to="/">Abara Dabra</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div className="navbar-nav ml-lg">
              
                  <Render/>
                 
      </div>
    </div>
  </div>
</nav>



                    </div>


                );

}

export default Navbar;