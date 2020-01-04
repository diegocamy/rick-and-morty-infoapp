import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    margin: 'auto',
    textDecoration: 'none',
    textAlign: 'center'
  },
  media: {
    height: 140,
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px auto'
  },
  button: {
    margin: '10px',
    color: 'white',
    justifySelf: 'center'
  },
  description: {
    margin: '0 auto',
    whiteSpace: "nowrap",
    width: "90%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      locations: [],
      prevPage: '',
      nextPage: '',
      id: this.props.match.params.page
    }
  }

  componentDidMount() {
    this.fetchLocations(this.state.id);
  }

  async fetchLocations(page) {
    try {
      this.setState({ loading: true })
      const data = await Axios.get(`https://rickandmortyapi.com/api/location/?page=${page}`)
      const locations = await data.data.results;
      const prevPage = await data.data.info.prev;
      const nextPage = await data.data.info.next;
      this.setState({ loading: false, locations, prevPage, nextPage })
    } catch (error) {
      this.props.history.push('/404')
    }
  }



  render() {
    const { classes } = this.props;
    const prevPage = this.state.prevPage ? this.state.prevPage.match(/\d/g).join("") : null;
    const nextPage = this.state.nextPage ? this.state.nextPage.match(/\d/g).join("") : null;
    const prevButton = this.state.prevPage ? <Button to={`/locations/page=${prevPage}`} component={Link} variant="contained" color="secondary" className={classes.button}>Previous</Button> : null;
    const nextButton = this.state.nextPage ? <Button to={`/locations/page=${nextPage}`} component={Link} variant="contained" color="primary" className={classes.button}>Next</Button> : null;
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      const locations = this.state.locations.map((l, i) => {
        return (
          <Grid item xs={12} sm={6} lg={6} key={l.id} >
            <Link exact="true" to={`/location/${l.id}`} style={{ textDecoration: 'none' }}>
              <Card className={classes.card}>
                <LocationOnIcon color="primary" fontSize="large" style={{ margin: '10px auto -10px auto' }} />
                <CardContent className={classes.description} >
                  <Typography gutterBottom variant="h6" component="h6">
                    {l.name}
                  </Typography>
                  <Typography gutterBottom variant="p" component="p">
                    Residents: {l.residents.length}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid >
        )
      })
      return (
        <div className={classes.root}>
          <h1 style={{ textAlign: 'center' }}>LOCATIONS</h1>
          <Grid container spacing={3}>
            {locations}
          </Grid>
          <div className={classes.buttonBox}>
            {prevButton}
            {nextButton}
          </div>
        </div>

      )
    }
  }
}

Locations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locations);
