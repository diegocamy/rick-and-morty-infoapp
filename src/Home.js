import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logo.png'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  img: {
    width: '100%',
  }
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height: '80vh' }}>
      <img className={classes.img} src={logo} alt="logo" />
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button to="/characters/page=1" component={Link}>Characters</Button>
        <Button to="/episodes/page=1" component={Link}>Episodes</Button>
        <Button to="/locations/page=1" component={Link}>Locations</Button>
      </ButtonGroup>
    </div>
  )
}
