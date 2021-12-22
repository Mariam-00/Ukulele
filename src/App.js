import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdminHome from './admin/AdminHome';
import AdminCreateFlights from './admin/AdminCreateFlight';
import AdminListAllFlights from './admin/AdminListFlights';
import Home from './Home';
import SearchAvailableFlights from './searchAvailableFlights';
import Search from './admin/Search';
import ListSearch from './admin/ListSearch'
import Test from './admin/Test';
import ExistingUserHome from './existingUser/ExistingUserHome';
import EditProfile from './existingUser/EditProfile';
import ListDepartureFlights from './existingUser/ListDepartureFlights';
import DepartureDetail from './existingUser/DepartureDetail';
import ListReturnFlights from './existingUser/ListReturnFlights';
import MyBookings from './existingUser/MyBookings';
import Dummy from './existingUser/Dummy';
import CheckIn from './existingUser/CheckIn';
import CheckInReturn from './existingUser/CheckInReturn';
function App() {

  return (
    <Router>
     <div className="App">
     <Route path="/home" exact component={Home}/> 
     <Route path="/home" exact component={Home}/> 
     <Route path="/dummy/:id" exact component={Dummy}/>
     <Route path="/checkIn/:id" exact component={CheckIn}/>
     <Route path="/checkInReturn/" exact component={CheckInReturn}/>
    <Route path="/create-flights" exact component={AdminCreateFlights}/>
    <Route path="/list-flights" exact component={AdminListAllFlights}/>
    <Route path="/search-flights" exact component={Search}/>
    <Route path="/user/:id" exact component={ExistingUserHome}/> 
    <Route path="/bookings/:id" exact component={MyBookings}/> 
     <Route path="/edit/:id" exact component={EditProfile}/>
    <Route path="/list-search/:id" exact component={ListSearch}/>
    <Route path="/test/:id" exact component={Test}/>
    <Route path="/list-dep/:id" exact component={ListDepartureFlights}/>
    <Route path="/search-available" exact component={SearchAvailableFlights}/>
    <Route path="/dep-det/:id" exact component={DepartureDetail}/>
    <Route path="/list-ret/" exact component={ListReturnFlights}/>


      </div>
    </Router>
    
  );
}

export default App;
