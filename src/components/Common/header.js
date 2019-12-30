import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 111,
    padding: 0,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  menuItem: { 
    position: 'relative', 
    display: 'flex', 
    alignItems: 'center',
    "& a": {
      textDecoration: 'none !important'
    },
    "&.active, a:hover": {
      color: '#0671B8 !important',
    },
    "&:hover ul": {
      height: 'auto',
      opacity: 1,
      padding: '5px 15px',
    }
  },
  toolbarLink: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 500,
    textTransform: 'uppercase',
    borderRight: '1px solid rgba(0, 0, 0, 0.05)',
  },
  subMenu: {
    position: 'absolute',
    left: '50%',
    height: 0,
    padding: 0,
    overflow: 'hidden',
    top: '100%',
    transform: 'translateX(-50%)',
    transition: '.2s height',
    backgroundColor: '#fff',
    boxShadow: '1px 1px 5px 0 rgba(0, 0, 0, 0.2)',
    listStyle: 'none',
    width: 204,
    "& >li": {
      textTransform: 'uppercase',
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
  imageLogo: {
    height: 58,
    width: 200
  },
  socialBox: {
    display: 'flex',
    alignItems: 'center',
    borderLeft: '1px solid rgba(0, 0, 0, 0.05)', 
    borderRight: '1px solid rgba(0, 0, 0, 0.05)', 
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
  },
  socialItem: {
    padding: '0px 15px',
    color: '#828282',
  }
}));

const defaultProps = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
};

export default function Header(props) {
  const classes = useStyles();
  const { sections } = props;

  return (
    <header>
      <Box {...defaultProps} style={{ backgroundColor: '#f9f9f9', boxShadow: 'none' }}>
        <Container fixed maxWidth="lg">
          <Toolbar style={{ height: 60, display: 'flex', justifyContent: 'space-between', padding: 0}}>
            <Box className={classes.socialBox}>
              <Link
              href="#" 
              className={classes.socialItem}
              >
                <FontAwesomeIcon icon={faFacebookF}/>
              </Link>
              <Link
              href="#" 
              className={classes.socialItem}
              >
                <FontAwesomeIcon icon={faTwitter}/>
              </Link>
              <Link
              href="#" 
              className={classes.socialItem}
              >
                <FontAwesomeIcon icon={faLinkedinIn}/>
              </Link>
              <Link
              href="#" 
              className={classes.socialItem}
              >
                <FontAwesomeIcon icon={faInstagram}/>
              </Link>
            </Box>
            <Box className={classes.socialBox}>
              <Link
              href="#" 
              className={classes.socialItem}
              >
                <FontAwesomeIcon icon={faPhoneAlt}/>
              </Link>
              <Link
              href="tel:61 3 8621 2900" 
              className={classes.socialItem}>+61 3 8621 2900</Link
              >
            </Box>
          </Toolbar>
        </Container>
      </Box>

      <Container fixed maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid
              item xs={3}>
              <img className={classes.imageLogo} alt="Gardiner Foundation" src="https://www.gardinerfoundation.com.au/wp-content/uploads/2019/06/Gardiner-Foundation-logo.jpg" />
            </Grid>
            <Grid
              container
              item
              xs={8}
              display="flex"
              direction="row"
              justify="flex-end"
            >
              <React.Fragment>
                {sections.map((section, index) => (<Box key={index} className={classes.menuItem}>
                    <Link
                      color="inherit"
                      noWrap
                      key={section.title}
                      variant="body2"
                      href={section.url}
                      className={`${classes.toolbarLink} ${section.isActive ? 'active' : ''}`}>
                      {section.title}
                    </Link>
                      { section.subMenu && 
                        <ul className={classes.subMenu}>
                          {section.subMenu.map((item, number) => (
                            <li key={number}>
                              <Link color="inherit" href={item.url}>
                                {item.title}
                              </Link>
                            </li>
                          ))}
                      </ul>}
                  </Box>
                ))}
                <Link
                  color="inherit"
                  noWrap
                  variant="body2"
                  href={'#'}
                  >
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </Link>
              </React.Fragment>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </header>
  );
}



Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};