import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./header/NavBar";
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import Nav from "./header/Nav";
import Login from "./users/Login";
import Test from "./users/Test";

function App() {

  return (
    <div className="App">
        <Router>
            <Nav/>
            <Routes>
                <Route exact path = "/" element={<Home/>}/>
                <Route exact path = "/user" element={<AddUser/>}/>
                <Route exact path = "/edituser/:id" element={<EditUser/>}/>
                <Route exact path = "/viewuser/:id" element={<ViewUser/>}/>
                <Route exact path = "/loginuser" element={<Login/>}/>
                <Route exact path = "/test" element={<Test/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
