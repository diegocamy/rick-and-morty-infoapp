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


class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: null,
      characters: []
    }
  }

  componentDidMount() {
    this.fetchEpisode();
  }

  async fetchEpisode() {
    try {
      const id = this.props.match.params.id;
      const res = await Axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      const data = await res.data;
      this.setState({ episode: data }, () => this.fetchCharacters(this.state.episode.characters));
    } catch (error) {
      this.props.history.push('/404')
    }
  }

  async fetchCharacters(characters) {
    try {
      const caca = characters.map(async (c) => {
        const res = await Axios.get(c);
        const data = await res.data;
        return data
      });
      Promise.all(caca).then(values => this.setState({ characters: values }))
    } catch (error) {
      this.props.history.push('/404')
    }
  }

  render() {
    const { classes } = this.props;
    if (!this.state.episode) {
      return <h1>Loading...</h1>
    } else {
      const { name, episode, air_date } = this.state.episode;
      const characters = this.state.characters.map((c, i) => {
        return (
          <Grid item xs={12} sm={6} lg={3} key={c.id} >
            <Card className={classes.card} >
              <Link exact="true" to={`/character/${c.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={c.image}
                    title={c.name}
                  />
                  <CardContent className={classes.description} >
                    <Typography gutterBottom variant="h6" component="h6" style={{ textAlign: 'center' }}>
                      {c.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid >
        )
      })

      return (
        <div className={classes.root}>
          <h1 style={{ textAlign: 'center' }}>{name}</h1>
          <h3 style={{ textAlign: 'center' }}>{episode}</h3>
          <p style={{ textAlign: 'center' }}>{air_date}</p>
          <h2 style={{ textAlign: 'center' }}>Characters</h2>
          <Grid container spacing={3}>
            {characters}
          </Grid>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button style={{ margin: 30 }} variant="contained" color="primary" onClick={this.props.history.goBack}>Go Back</Button>
          </div>
        </div>
      )
    }
  }
}


Episode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Episode);