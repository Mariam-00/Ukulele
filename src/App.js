import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdminHome from './admin/AdminHome';
import AdminCreateFlights from './admin/AdminCreateFlight';
import AdminListAllFlights from './admin/AdminListFlights';
//import AdminUpdateFlights from './admin/AdminUpdateFlights';

import Search from './admin/Search';
import ListSearch from './admin/ListSearch'
import Test from './admin/Test';
//var cors = require("cors");
//app.use(cors());
function App() {

  return (
    <Router>
     <div className="App">
     
    <Route path="/" exact component={AdminHome}/>
    <Route path="/create-flights" exact component={AdminCreateFlights}/>
    <Route path="/list-flights" exact component={AdminListAllFlights}/>
    <Route path="/search-flights" exact component={Search}/>
    <Route path="/list-search/:id" exact component={ListSearch}/>
    <Route path="/test/:id" exact component={Test}/>


      </div>
    </Router>
    
  );
}

export default App;
