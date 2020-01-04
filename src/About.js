import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '70vh',
    width: '80vw'
  },
  card: {
    width: '80%',
    margin: '0 auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ marginTop: '30px' }}>
        <Grid item xs={12} sm={12} lg={12} >
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h2" component="h2">
                About
        </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Rick & Morty InfoApp
        </Typography>
              <Typography variant="body2" component="p">
                This web app uses the Rick And Morty API
              </Typography>
              <br />
              <Typography variant="h5" component="h5">
                What is it?
              </Typography>
              <Typography variant="body2" component="p">
                The Rick and Morty API (or ShlaAPI) is a RESTful and GraphQL API based on the television show Rick and Morty. You will have access to about hundreds of characters, images, locations and episodes. We are still gathering data, because as you probably know, there are trillions of characters and locations. The Rick and Morty API is filled with canonical information as seen on the TV show.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary"><a href="https://rickandmortyapi.com/about" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>Learn More</a></Button>
              <Button variant="contained" color="secondary"><a href="https://github.com/diegocamy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>My Github</a></Button>
              <Button variant="contained" to="/" component={Link}>Go back</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div >
  );
}
