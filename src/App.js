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
import ReturnDetails from './existingUser/ReturnDetails';
import Summary from './existingUser/Summary';
import ConfirmReservation from './existingUser/ConfirmReservation';
import MyBookings from './existingUser/MyBookings';
import Login from './Login'
import Dummy from './existingUser/Dummy';
import CheckIn from './existingUser/CheckIn';
import CheckInReturn from './existingUser/CheckInReturn';
import SignUp from './SignUp';
import ChangePassword from './existingUser/ChangePassword';
import SearchForFlight from './existingUser/SearchForAFlight';
import ChangeDepSeats from './existingUser/ChangeDepSeat';
import ChangeRetSeats from './existingUser/ChangeRetSeats';
import OneWayDep from './existingUser/OneWayDep';
import NewDepSeats from './existingUser/NewDepSeats';
import NewRetSeats from './existingUser/NewRetSeats';
import SearchForARetFlight from './existingUser/SearchForARetFlight';
import OneWayRet from './existingUser/OneWayRet';
import Payment from './existingUser/Payment';
function App() {

  return (
    <Router>
     <div className="App">
     <Route path="/home" exact component={Home}/> 
    <Route path="/" exact component={Login}/>
     <Route path="/home" exact component={Home}/> 
     <Route path="/dummy/:id" exact component={Dummy}/>
     <Route path="/checkIn/:id" exact component={CheckIn}/>
     <Route path="/checkInReturn/" exact component={CheckInReturn}/>
    <Route path="/create-flights" exact component={AdminCreateFlights}/>
    <Route path="/list-flights" exact component={AdminListAllFlights}/>
    <Route path="/search-flights" exact component={Search}/>
    <Route path="/user/:id" exact component={ExistingUserHome}/> 
    <Route path="/edit/:id" exact component={EditProfile}/>
    <Route path="/bookings/:id" exact component={MyBookings}/> 
    <Route path="/edit/:id" exact component={EditProfile}/>
    <Route path="/list-search/:id" exact component={ListSearch}/>
    <Route path="/test/:id" exact component={Test}/>
    <Route path="/list-dep/:id" exact component={ListDepartureFlights}/>
    <Route path="/search-available" exact component={SearchAvailableFlights}/>
    <Route path="/dep-det/:id" exact component={DepartureDetail}/>
    <Route path="/list-ret/" exact component={ListReturnFlights}/>
    <Route path="/ret-det/:id" exact component={ReturnDetails}/>
    <Route path="/summary" exact component={Summary}/>
    <Route path="/confirm" exact component={ConfirmReservation}/>
    <Route path="/adminHome" exact component={AdminHome}/>
    <Route path="/sign-up" exact component={SignUp}/>
    <Route path="/change-password" exact component={ChangePassword}/>
    <Route path="/look-flight" exact component={SearchForFlight}/>
    <Route path="/onewaydep/:id" exact component={OneWayDep}/>
    <Route path="/changeDepSeats/:id"  exact component={ChangeDepSeats}/>
    <Route path="/lookret-flight" exact component={SearchForARetFlight}/>
    <Route path="/onewayret/:id" exact component={OneWayRet}/>
    <Route path="/changeRetSeats/:id"  exact component={ChangeRetSeats }/>
    <Route path="/NewDepSeats/"  exact component={NewDepSeats }/>   
    <Route path="/NewRetSeats/"  exact component={NewRetSeats }/>
    <Route path="/payment/:id"  exact component={Payment }/>
      </div>
    </Router>
    
  );
}

export default App;
