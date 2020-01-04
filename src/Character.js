import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = () => (theme => ({
  root: {
    flexGrow: 1,
    margin: '20px'
  },
  card: {
    maxWidth: 345,
    margin: 'auto'
  },
  media: {
    height: 140
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px auto'
  },
  button: {
    margin: '10px',
    color: 'white',
    justifySelf: 'center',
    display: 'block'
  },
  description: {
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      character: null
    }
  }

  componentDidMount() {
    this.fetchCaracter();
  }

  async fetchCaracter() {
    this.setState({ loading: true })
    try {
      const id = this.props.match.params.id;
      const res = await Axios
        .get(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await res.data;
      this.setState({ character: data }, () => {
        setTimeout(() => {
          this.setState({ loading: false })
        }, 1000);
      })
    } catch (error) {
      this.props.history.push('/404')
    }

  }
  render() {
    const { classes } = this.props;
    if (this.state.character === null) {
      return <h1>Loading...</h1>
    } else {
      const { name, image, status, species, type, gender, origin, location, episode } = this.state.character;
      return (
        <div style={{ flexGrow: 1, margin: '20px auto', width: '100%' }}>
          <Grid container spacing={1} style={{ margin: 'auto' }} direction="column">
            <Grid item xs={10} lg={5} style={{ margin: 'auto' }} >
              <Card className={classes.card} >
                <CardHeader
                  title={name}
                  subheader={`Status: ${status}`}
                />
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    style={{ height: '240px' }}
                    image={image}
                    title={name}
                  />
                  <CardContent className={classes.description}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Species: {species}<br />
                      Type: {type}<br />
                      Gender: {gender}<br />
                      Origin: {origin.url ? <Link style={{ fontWeight: 500 }} to={`/location/${origin.url.match(/\d/g).join("")}`}>{origin.name}</Link> : origin.name}<br />
                      Location: {location.url ? <Link style={{ fontWeight: 500 }} to={`/location/${location.url.match(/\d/g).join("")}`}>{location.name}</Link> : location.name}<br />

                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <ExpansionPanel className={classes.card}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Episodes:</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {episode.map((e, i) => {
                      return (
                        <span key={i} style={{ margin: 5, padding: 5, lineHeight: 5 }}>
                          <Button to={`/episode/${e.match(/\d/g).join("")}`} component={Link} variant="contained" color="secondary" className={classes.button}>{`Episode ${e.match(/\d/g).join("")}`}</Button>
                        </span>

                      )
                    })}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
          <div style={{ width: '100 %', textAlign: 'center' }}>
            <Button style={{ margin: '10px auto' }} variant="contained" color="primary" onClick={() => this.props.history.goBack()}>GO BACK</Button>
          </div>
        </div >
      )
    }
  }
}

Character.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Character);
