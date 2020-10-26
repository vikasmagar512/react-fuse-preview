import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QrReader from 'react-qr-reader';
import QRCode from 'react-qr-code';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function ProfilePage() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const user = useSelector(({ auth }) => auth.user);
	const [allowScan, toggleAllowScan] = useState(true)
	function handleTabChange(event, value) {
		setSelectedTab(value);
	}
	const [result, setResult] = useState('No result')

	const handleScan = data => {
		console.log("============", data);
		if (data) {
			setResult(data)
		}
	}
	const handleError = err => {
		console.error(err)
	}

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
					<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg" />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography
								className="md:mx-24 text-24 md:text-32 my-8 md:my-0"
								variant="h4"
								color="inherit"
							>
								John Doe
							</Typography>
						</FuseAnimate>
					</div>

					<div className="flex items-center justify-end">
						<Button className="mx-8 normal-case" variant="contained" color="secondary" aria-label="Follow">
							Follow
						</Button>
						<Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">
							Send Message
						</Button>
					</div>
				</div>
			}
			// contentToolbar={
			// 	<Tabs
			// 		value={selectedTab}
			// 		onChange={handleTabChange}
			// 		indicatorColor="primary"
			// 		textColor="primary"
			// 		variant="scrollable"
			// 		scrollButtons="off"
			// 		classes={{
			// 			root: 'h-64 w-full'
			// 		}}
			// 	>
			// 		<Tab
			// 			classes={{
			// 				root: 'h-64'
			// 			}}
			// 			label="Timeline"
			// 		/>
			// 		<Tab
			// 			classes={{
			// 				root: 'h-64'
			// 			}}
			// 			label="About"
			// 		/>
			// 		<Tab
			// 			classes={{
			// 				root: 'h-64'
			// 			}}
			// 			label="Photos & Videos"
			// 		/>
			// 	</Tabs>
			// }
			content={
				<div className="qr-scanner">
					{user.role === 'user' && <div><QRCode value={Date.now()}/></div>}
					{user.role === 'staff' && <div>
						<Button
							onClick={() => toggleAllowScan(!allowScan)}
						>Scan</Button>
						<p>{result}</p>
						{ allowScan &&
							<div>
								<QrReader
									delay={200}
									onError={handleError}
									onScan={handleScan}
									style={{
										height: 256,
										width: 256,
									}}
								/>
							</div>
						}
					</div> }
				</div>
			}
		/>
	);
}

export default ProfilePage;
