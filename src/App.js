import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditManager from "./pages/admin/control_managers/edit_manager/EditManager";
import ViewUser from "./users/ViewUser";
import {Nav} from "./header/Nav";
import Login from "./pages/login/Login";
import Test from "./users/Test";
import {Footer} from "./header/Footer";
import { AuthContext } from "./contexts/authContext";
import {useState} from "react";
import {Main} from "./pages/user/main/Main";
import Home from "./pages/Home";
import ControlUsers from "./pages/admin/control_managers/ControlUsers";
import ControlManager from "./pages/admin/control_managers/ControlManagers"
import AddManager from "./pages/admin/control_managers/add_manager/AddManager";
import Registration from "./pages/login/registration/Registration";

function App() {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <div className="App">
        <Router>
            <AuthContext.Provider value={{ authData, setAuthData }}>
                <Nav/>
                <Routes>
                    <Route exact path = "/" element={<Main/>}/>
                    <Route exact path = "/user" element={<AddUser/>}/>
                    <Route exact path = "/edituser/:id" element={<EditManager/>}/>
                    <Route exact path = "/viewuser/:id" element={<ViewUser/>}/>
                    <Route exact path = "/loginuser" element={<Login/>}/>
                    <Route exact path = "/registration" element={<Registration/>}/>
                    <Route exact path = "/test" element={<Test/>}/>
                    <Route exact path = "/home" element={<Home/>}/>
                    <Route exact path = "/admin/dashboard-user" element={<ControlUsers/>}/>
                    <Route exact path = "/admin/dashboard-manager" element={<ControlManager/>}/>
                    <Route exact path = "/admin/dashboard-manager/add-manager" element={<AddManager/>}/>
                </Routes>
                {!authData || authData.roles[0] === 'USER' ? <Footer/> : ""}
            </AuthContext.Provider>
        </Router>
    </div>
  );
}

export default App;
