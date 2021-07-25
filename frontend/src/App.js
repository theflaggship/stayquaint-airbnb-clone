import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LodgingsBrowser from "./components/LodgingsBrowser";
import NewLodgingForm from "./components/NewLodgingForm";
import LodgingPage from "./components/LodgingPage";
import MyLodgingsPage from './components/MyLodgingsPage';
import MyBookingsPage from './components/MyBookingsPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <LodgingsBrowser />
          </Route>
          <Route path="/lodgings" exact>
            <NewLodgingForm />
          </Route>
          <Route path="/lodgings/:lodgingId">
            <LodgingPage />
          </Route>
          <Route path="/user/lodgings/:userId">
            <MyLodgingsPage />
          </Route>
          <Route path="/bookings/users/:userId">
            <MyBookingsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
