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
import MovieIcon from '@material-ui/icons/Movie';


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

class Episodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      next: '',
      prev: '',
      id: this.props.match.params.page
    }
  }

  componentDidMount() {
    this.fetchEpisodes(this.state.id);
  }



  async fetchEpisodes(page) {
    try {
      const res = await Axios.get(`https://rickandmortyapi.com/api/episode/?page=${page}`);
      const data = await res.data;
      this.setState({ episodes: data.results, next: data.info.next, prev: data.info.prev })
    } catch (error) {
      this.props.history.push('/404')
    }
  }

  render() {
    const { classes } = this.props;
    const prevPage = this.state.prev ? this.state.prev.match(/\d/g).join("") : null;
    const nextPage = this.state.next ? this.state.next.match(/\d/g).join("") : null;
    const prevButton = this.state.prev ? <Button to={`/episodes/page=${prevPage}`} component={Link} variant="contained" color="secondary" className={classes.button}>Previous</Button> : null;
    const nextButton = this.state.next ? <Button to={`/episodes/page=${nextPage}`} component={Link} variant="contained" color="primary" className={classes.button}>Next</Button> : null;


    if (this.state.episodes) {
      const episodes = this.state.episodes.map((e, i) => {
        return (
          <Grid item xs={12} sm={6} lg={6} key={e.id} >
            <Link exact="true" to={`/episode/${e.id}`} style={{ textDecoration: 'none' }}>
              <Card className={classes.card}>
                <MovieIcon color="primary" fontSize="large" style={{ margin: '10px auto -10px auto' }} />
                <CardContent className={classes.description} >
                  <Typography gutterBottom variant="h6" component="h6">
                    {e.name}
                  </Typography>
                  <Typography gutterBottom variant="p" component="p">
                    {e.episode}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid >
        )
      })
      return (
        <div className={classes.root}>
          <h1 style={{ textAlign: 'center' }}>Episodes</h1>
          <Grid container spacing={3}>
            {episodes}
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

Episodes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Episodes);

