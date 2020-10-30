import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductById } from '../store/productsSlice';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	typeIcon: {
		'&.folder:before': {
			content: "'folder'",
			color: '#FFB300'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	}
});

function DetailSidebarContent(props) {
	const selectedItem = useSelector(state => selectProductById(state, state.eCommerceApp.products.selectedItemId));

	const classes = useStyles();

	if (!selectedItem) {
		return (
			<div className="flex flex-col justify-between h-full p-4 sm:p-12">
				<div className="p-12">
					<FuseAnimate delay={200}>
						<Typography variant="subtitle1" className="mb-8">
							Please select row to see details
						</Typography>
					</FuseAnimate>
				</div>
			</div>
		);
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>
			<div className="file-details p-16 sm:p-24">

				<Typography variant="subtitle1" className="py-16">
					Info
				</Typography>

				<table className={clsx(classes.table, 'w-full text-justify')}>
					<tbody>
						<tr className="modified">
							<th>Date</th>
							<td>{selectedItem.startDate}</td>
						</tr>
						<tr className="size">
							<th>Content</th>
							<td>{selectedItem.contents === '' ? '-' : selectedItem.contents}</td>
						</tr>
						<tr className="size">
							<th>Categort</th>
							<td>{selectedItem.category === '' ? '-' : selectedItem.category}</td>
						</tr>
						<tr className="type">
							<th>Amount</th>
							<td>{selectedItem.amount}</td>
						</tr>
						<tr className="size">
							<th>Status</th>
							<td>{selectedItem.status === '' ? '-' : selectedItem.status}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</FuseAnimate>
	);
}

export default DetailSidebarContent;
