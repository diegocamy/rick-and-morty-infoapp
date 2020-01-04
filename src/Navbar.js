import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem to="/characters/page=1" component={Link} button>
          <ListItemText primary={"Characters"} />
        </ListItem>
        <ListItem to="/episodes/page=1" component={Link} button>
          <ListItemText primary={"Episodes"} />
        </ListItem>
        <ListItem to="/locations/page=1" component={Link} button>
          <ListItemText primary={"Locations"} />
        </ListItem>
        <ListItem to="/about" component={Link} button>
          <ListItemText primary={"About"} />
        </ListItem>
      </List>
    </div >
  );

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon
                style={{ color: 'white' }}
                aria-controls="simple-menu"
                aria-haspopup="true"

              />
            </IconButton>
            <Typography to="/" component={Link} variant="h6" className={classes.title}>
              Rick & Morty InfoApp
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

