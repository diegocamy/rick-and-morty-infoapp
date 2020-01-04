import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

import { Navbar } from './Navbar';
import { Home } from './Home';
import Characters from './Characters';
import Character from './Character';
import NotFound from './NotFound';
import Locations from './Locations';
import Location from './Location';
import Episodes from './Episodes';
import Episode from './Episode';
import About from './About';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  app: {
    height: '100vh',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <HashRouter basename='/'>
      <div className={classes.app}>
        <Navbar />
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md" className={classes.container}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/about" render={() => <About />} />
              <Route exact path="/characters/page=:page" render={(routeProps) => <Characters {...routeProps} key={new Date().toString()} />} />
              <Route exact path="/character/:id" render={(routeProps) => <Character {...routeProps} />} />
              <Route exact path="/locations/page=:page" render={(routeProps) => <Locations {...routeProps} key={new Date().toString()} />} />
              <Route exact path="/location/:id" render={(routeProps) => <Location {...routeProps} />} />
              <Route exact path="/episodes/page=:page" render={(routeProps) => <Episodes {...routeProps} key={new Date().toString()} />} />
              <Route exact path="/episode/:id" render={(routeProps) => <Episode {...routeProps} />} />
              <Route exact path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </React.Fragment>
      </div >
    </HashRouter>
  )

}

export default App;
