import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Axios from 'axios';
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
    textDecoration: 'none'
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
    whiteSpace: "nowrap",
    width: "90%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

class Characters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      prevPage: '',
      nextPage: '',
      id: this.props.match.params.page
    }
  }

  componentDidMount() {
    this.fetchCaracters(this.state.id);
  }

  async fetchCaracters(page) {
    try {
      const res = await Axios
        .get(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const data = await res.data;
      const prevPage = await data.info.prev;
      const nextPage = await data.info.next;
      const characters = await data.results;
      this.setState({ characters, prevPage, nextPage })
    } catch (error) {
      this.props.history.push('/404')
    }

  }

  render() {
    const { classes } = this.props;
    const prevPage = this.state.prevPage ? this.state.prevPage.match(/\d/g).join("") : null;
    const nextPage = this.state.nextPage ? this.state.nextPage.match(/\d/g).join("") : null;
    const prevButton = this.state.prevPage ? <Button to={`/characters/page=${prevPage}`} component={Link} variant="contained" color="secondary" className={classes.button}>Previous</Button> : null;
    const nextButton = this.state.nextPage ? <Button to={`/characters/page=${nextPage}`} component={Link} variant="contained" color="primary" className={classes.button}>Next</Button> : null;

    if (!this.state.characters) {
      return <h1>Loading...</h1>
    } else {

      const characters = this.state.characters.map(c => {
        return (
          <Grid item xs={12} sm={6} lg={3} key={c.id} >
            <Link exact="true" to={`/character/${c.id}`} style={{ textDecoration: 'none' }}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={c.image}
                    title={c.name}
                  />
                  <CardContent className={classes.description} >
                    <Typography gutterBottom variant="h5" component="h5" noWrap>
                      {c.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid >
        )
      })

      return (
        <div className={classes.root}>
          <h1 style={{ textAlign: 'center' }}>Characters</h1>
          <Grid container spacing={3}>
            {characters}
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

Characters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Characters);