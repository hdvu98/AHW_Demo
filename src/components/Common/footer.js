import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { display } from '@material-ui/system';

function Copyright() {
  const classes = useStyles();
  return (<Box className={classes.copyRight}>
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: '#c9c9c9;',
    // marginTop: theme.spacing(8),
  },
  footerContainer: {
    padding: theme.spacing(9, 0)
  },
  imageLogo: {
    maxWidth: 262,
    height: 61,
    paddingRight: 50,
  },
  toolbarLink: {
    display: 'block',
    width: '100%',
    "&:hover": {
      color: '#0671B8',
      textDecoration: 'none'
    },
    "&.isActive": {
      color: '#fff',
    }
  },
  footerItemLink: {
    width: '100%',
  },
  copyRight: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
  }
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title, footerMenu } = props;

  return (
    <footer className={classes.footer}>
      <Container fixed maxWidth="lg">
        <Grid container spacing={1} className={classes.footerContainer}>
          <Grid container md={3} item xs={12}>
            <img className={classes.imageLogo} alt="Gardiner Foundation" src="https://www.gardinerfoundation.com.au/wp-content/uploads/2019/07/Gardiner-Foundation-footer-logo-new.png" />
          </Grid>

          { footerMenu.map((item, index) => {
            return (
              <Grid container md={3} item xs={12} key={index}>
              { item.map((e, i) => (
                  <Link
                  key={i}
                  color="inherit"
                  variant="body2"
                  href={e.url}
                  className={`${classes.toolbarLink} ${e.isActive ? 'isActive' : ''}`}
                >
                  {e.title}
                </Link>
              ))}
            </Grid>
            );
          })}
        </Grid>       
      </Container>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        {description}
      </Typography>
      <Copyright />
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};