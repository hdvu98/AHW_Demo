import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button, CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import Header from '../Common/header';
import Footer from '../Common/footer';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Dashboard(props) {
	const { classes } = props
	const sections = [
		{ title: 'Home', url: '#', isActive: true,},
		{ title: 'About us', url: '#', subMenu: [
      {
        title: 'Strategy',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'Our People',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'Governance',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'Associates',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'Publications & Resources',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'Past Projects',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      }
    ]},
		{ title: 'Our Programs', url: '#',subMenu: [
      {
        title: 'Research, Development & Extension',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'People & Community',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
      {
        title: 'Industry Engagement & Support',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      },
    ]},
		{ title: 'News & Events', url: '#',subMenu: [
      {
        title: 'Newsletters',
        url: 'https://www.gardinerfoundation.com.au/strategy/'
      }
    ]},
		{ title: 'Contact us', url: '#' },
	];
	const footerMenu = [
		[
			{ title: 'Home', url: '#', isActive: true },
			{ title: 'About us', url: '#' },
			{ title: 'Our Programs', url: '#' },
			{ title: 'News & Events', url: '#' },
			{ title: 'Contact us', url: '#' },
		],
		[
			{ title: 'Research, Development & Extension', url: '#' },
			{ title: 'People & Community', url: '#' },
			{ title: 'Industry Engagement & Support', url: '#' },
		],
		[
			{ title: '+61 3 8621 2900', url: '#' },
			{ title: 'Suite 3, Level 9 470 Collins St Melbourne VIC 3000', url: '#' },
		]
	];

	if (!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	// const [quote, setQuote] = useState('')

	// useEffect(() => {
	// 	firebase.getCurrentUserQuote().then(setQuote)
	// })

	return (
		<React.Fragment>
			<CssBaseline />
			<Header title="Animal Health" sections={sections} />
			<Container fixed maxWidth="lg">

				<Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'calc(100vh - 120px)' }} />
			</Container>
			<Footer footerMenu={footerMenu} title="Footer" description="Something here to give the footer a purpose!" />
		</React.Fragment>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))