import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditManager from "./pages/admin/control_managers/edit_manager/EditManager";
import ViewUser from "./users/ViewUser";
import {Nav} from "./header and footer/Nav";
import Login from "./pages/login and reg/Login";
import Test from "./users/Test";
import {Footer} from "./header and footer/Footer";
import { AuthContext } from "./contexts/authContext";
import {useState} from "react";
import {Main} from "./pages/main/Main";
import Home from "./pages/Home";
import ControlUsers from "./pages/admin/control_managers/tablesControl/ControlUsers";
import ControlManager from "./pages/admin/control_managers/tablesControl/ControlManagers"
import AddManager from "./pages/admin/control_managers/add_manager/AddManager";
import Registration from "./pages/login and reg/Registration";
import Panel from "./pages/manager/panel/Panel";
import AddRoom from "./pages/manager/rooms/add_rooms/AddRoom";
import AllRooms from "./pages/manager/rooms/all_rooms/AllRooms";
import ViewRoom from "./pages/manager/rooms/details_room/ViewRoom";
import Services from "./pages/manager/services/Services";
import Requests from "./pages/manager/requests/Requests";
import PersonalAccount from "./pages/account/personalAccount/PersonalAccount";
import EditAccount from "./pages/account/EditAccount/EditAccount";
import Contacts from "./pages/contacts/Contacts";
import Calls from "./pages/manager/calls/Calls";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./scroll/ScrollToTop";
import EditRoom from "./pages/manager/rooms/edit_room/EditRoom";

function App() {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <div className="App" style={{ minHeight: '100vh' }}>
        <ToastContainer />
        <div className="container_app" style={{ minHeight: '100vh' }}>
        <div className="container-width">
            <Router>
                <AuthContext.Provider value={{ authData, setAuthData }}>
                    {authData && authData.roles[0] === 'MANAGER' ? <Panel/> : <Nav/>}
                    <ScrollToTop/>
                    <Routes>
                        <Route exact path = "/user" element={<AddUser/>}/>
                        <Route exact path = "/viewuser/:id" element={<ViewUser/>}/>
                        <Route exact path = "/test" element={<Test/>}/>
                        <Route exact path = "/home" element={<Home/>}/>

                        <Route exact path = "/" element={<Main/>}/>
                        <Route exact path = "/loginuser" element={<Login/>}/>
                        <Route exact path = "/registration" element={<Registration/>}/>
                        <Route exact path = "/contacts" element={<Contacts/>}/>
                        <Route exact path = "/personal-account" element={<PersonalAccount/>}/>
                        <Route exact path = "/personal-account/edit" element={<EditAccount/>}/>

                        <Route exact path = "/admin/dashboard-user" element={<ControlUsers/>}/>
                        <Route exact path = "/admin/dashboard-manager" element={<ControlManager/>}/>
                        <Route exact path = "/admin/dashboard-manager/add-manager" element={<AddManager/>}/>
                        <Route exact path = "/edituser/:id" element={<EditManager/>}/>


                        <Route exact path = "/add_room" element={<AddRoom/>}/>
                        <Route exact path = "/rooms" element={<AllRooms/>}/>
                        <Route exact path = "/viewroom/:id" element={<ViewRoom/>}/>
                        <Route exact path = "/services" element={<Services/>}/>
                        <Route exact path = "/manager/list/reservations" element={<Requests/>}/>
                        <Route exact path = "/manager/calls" element={<Calls/>}/>
                        <Route exact path = "/editroom/:id" element={<EditRoom/>}/>

                    </Routes>
                    {!authData || authData.roles[0] === 'USER' ? <Footer/> : ""}
                </AuthContext.Provider>
            </Router>
        </div>
        </div>
    </div>
  );
}

export default App;
