import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MarsRovers from './marsRovers'
import APOD from './apod'
// import EPIC from './epic'
import NasaLibrary from './NasaLibrary'
import NavigationMenu from "./NavigationMenu";


export default function Routes() {
  return (
    <>
      <NavigationMenu />
      <Switch>
        <Route path="/apod" component={APOD} />
        <Route path="/mars-rovers" component={MarsRovers} />
        <Route path="/nasa-library" component={NasaLibrary} />
        <Route path='/default' render={() => <Redirect to= "/" />} />
      </Switch>
    </>
  );
}