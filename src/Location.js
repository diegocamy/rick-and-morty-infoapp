import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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


class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      resid: []
    }
  }

  componentDidMount() {
    this.fetchLocation();
  }

  async fetchLocation() {
    try {
      const id = this.props.match.params.id;
      const res = await Axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      this.setState({ location: res.data }, () => this.fetchResidents(this.state.location.residents));
    } catch (error) {
      this.props.history.push('/404')
    }

  }

  async fetchResidents(residents) {
    try {
      const caca = residents.map(async (r) => {
        const res = await Axios.get(r);
        const data = await res.data;
        return data;
      });
      Promise.all(caca).then(values => this.setState({ resid: values }))
    } catch (error) {
      this.props.history.push('/404')
    }
  }
  render() {
    const { classes } = this.props;
    if (!this.state.location) {
      return <h1>Loading...</h1>
    } else {
      const { name, type, dimension } = this.state.location;
      const residents = this.state.resid.map((r, i) => {
        let lg;
        if (this.state.resid.length === 1) {
          lg = 12;
        } else if (this.state.resid.length === 2) {
          lg = 6;
        } else if (this.state.resid.length === 3) {
          lg = 4;
        } else {
          lg = 3;
        }
        return (
          <Grid item xs={12} sm={6} lg={lg} key={r.id} >
            <Card className={classes.card} >
              <Link exact="true" to={`/character/${r.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={r.image}
                    title={r.name}
                  />
                  <CardContent className={classes.description} >
                    <Typography gutterBottom variant="h6" component="h6" style={{ textAlign: 'center' }}>
                      {r.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid >
        )
      })

      return (
        <div className={classes.root} style={{ width: '80%' }}>
          <h1 style={{ textAlign: 'center' }}>{name}</h1>
          <h3 style={{ textAlign: 'center' }}>Type: {type}</h3>
          <h3 style={{ textAlign: 'center' }}>Dimension: {dimension}</h3>
          <h2 style={{ textAlign: 'center' }}>Residents</h2>
          <Grid container spacing={2}>
            {residents}
          </Grid>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button style={{ margin: 30 }} variant="contained" color="primary" onClick={this.props.history.goBack}>Go Back</Button>
          </div>

        </div>
      )
    }
  }
}

Location.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Location);
