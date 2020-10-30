import Checkbox from '@material-ui/core/Checkbox';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItem, setSelectedItems, selectProducts } from '../store/productsSlice';
import OrdersTableHead from './OrdersTableHead'
function FileList(props) {
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const selectedItemId = useSelector(({ eCommerceApp }) => eCommerceApp.products.selectedItemId);
	const selectedItems = useSelector(({ eCommerceApp }) => eCommerceApp.products.selectedItems);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	function handleCheck(event, id) {
		const selectedIndex = selectedItems.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedItems, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedItems.slice(1));
		} else if (selectedIndex === selectedItems.length - 1) {
			newSelected = newSelected.concat(selectedItems.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1)
			);
		}

		dispatch(setSelectedItems(newSelected));
	}

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			dispatch(setSelectedItems(products.map(n => n.id)));
			return;
		}
		dispatch(setSelectedItems([]));
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<Table>
				<OrdersTableHead
					numSelected={selectedItems.length}
					order={order}
					onSelectAllClick={handleSelectAllClick}
					onRequestSort={handleRequestSort}
					rowCount={products.length}
				/>
				<TableBody>
					{products.map(item => {
						return (
							<TableRow
								key={item.id}
								hover
								selected={item.id === selectedItemId}
								className="cursor-pointer"
							>
								<TableCell className="w-40 md:w-64 text-center" padding="none">
									<Checkbox
										checked={item.id === selectedItems.find(i=>i===item.id)}
										onClick={event => event.stopPropagation()}
										onChange={event => handleCheck(event, item.id)}
									/>
								</TableCell>
								<TableCell className="hidden sm:table-cell"
									onClick={event => dispatch(setSelectedItem(item.id))}>
									{item.startDate}</TableCell>
								<TableCell
									onClick={event => dispatch(setSelectedItem(item.id))}>
									{item.item}</TableCell>
								<TableCell className="hidden sm:table-cell" align="right"
									onClick={event => dispatch(setSelectedItem(item.id))}>
									{item.amount}</TableCell>
								<TableCell className="hidden sm:table-cell"
									onClick={event => dispatch(setSelectedItem(item.id))}>
									{item.status}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</FuseAnimate>
	);
}

export default FileList;
