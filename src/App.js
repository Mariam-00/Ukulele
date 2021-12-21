import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdminHome from './admin/AdminHome';
import AdminCreateFlights from './admin/AdminCreateFlight';
import AdminListAllFlights from './admin/AdminListFlights';
import Home from './Home';

import Search from './admin/Search';
import ListSearch from './admin/ListSearch'
import Test from './admin/Test';
import ExistingUserHome from './existingUser/ExistingUserHome';
import ListDepartureFlights from './existingUser/ListDepartureFlights';
import EditProfile from './existingUser/EditProfile';
function App() {

  return (
    <Router>
     <div className="App">
     <Route path="/home" exact component={Home}/> 
    <Route path="/" exact component={AdminHome}/>
    <Route path="/create-flights" exact component={AdminCreateFlights}/>
    <Route path="/list-flights" exact component={AdminListAllFlights}/>
    <Route path="/search-flights" exact component={Search}/>
    <Route path="/list-search/:id" exact component={ListSearch}/>
    <Route path="/test/:id" exact component={Test}/>
    <Route path="/list-dep/:id" exact component={ListDepartureFlights}/>
    <Route path="/user/:id" exact component={ExistingUserHome}/> 
    <Route path="/edit/:id" exact component={EditProfile}/>
   


      </div>
    </Router>
    
  );
}

export default App;
