import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, deleteProduct } from '../store/productsSlice';
function DetailSidebarHeader(props) {
	const selectedItem = useSelector(state => selectProductById(state, state.eCommerceApp.products.selectedItemId));
	const dispatch = useDispatch();

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
		<div className="flex flex-col justify-between h-full p-4 sm:p-12">
			<div className="toolbar flex align-center justify-end">
				<div className="flex flex-1 flex-grow-0 items-center justify-end">
					<Button
						className="normal-case"
						variant="outlined"
						component="button"
						role="button"
						onClick={()=>{
							dispatch(deleteProduct(selectedItem))
						}}
					>
						<Icon>delete</Icon>
						<span className="mx-4">Delete</span>
					</Button>
				</div>
				<div className="flex flex-1 flex-grow-0 items-center justify-end">
					<Button
						className="normal-case"
						variant="outlined"
						component="button"
						role="button"
					>
						<Icon>history</Icon>
						<span className="mx-4">Revise</span>
					</Button>
				</div>
			</div>

			<div className="p-12">
				<FuseAnimate delay={200}>
					<Typography variant="subtitle1" className="mb-8">
						{selectedItem.item}
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default DetailSidebarHeader;
