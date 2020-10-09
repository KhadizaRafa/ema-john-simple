import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Order from './components/Orders/Order';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Manage from './components/ManageInventory/Manage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { createContext } from 'react';
// import PlaceOrder from './components/PlaceOrder/PlaceOrder'
export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h3>{loggedInUser.email}</h3>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/order">
            <Order></Order>
          </Route>
          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          {/* <Route path="/placeOrder">
             <PlaceOrder></PlaceOrder>
          </Route> */}
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      

    </UserContext.Provider>
  );
}

export default App;
