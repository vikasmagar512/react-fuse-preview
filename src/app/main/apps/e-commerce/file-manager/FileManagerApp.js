import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import FileList from './FileList';
import reducer from '../store';
import { getProducts } from '../store/productsSlice';

function FileManagerApp(props) {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<FusePageSimple
			classes={{
				root: 'bg-red',
				header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				rightSidebar: 'w-320'
			}}
			header={
				<div className="flex flex-col flex-1 p-8 sm:p-12 relative">
					<div className="flex flex-1 items-end">
						<FuseAnimate animation="transition.expandIn" delay={600}>
							<Fab
								color="secondary"
								aria-label="Submit A Receipt"
								className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
								onClick={()=>{
									props.history.push(`/apps/e-commerce/receipts/new`);
								}}
							>
								<Icon>add</Icon>
							</Fab>
						</FuseAnimate> 
						<FuseAnimate delay={200}>
							<div>
								<Breadcrumb
									selected={{location:'Receipt Status'}}
									className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24"
								/>
							</div>
						</FuseAnimate>
					</div>
				</div>
			}
			content={<FileList pageLayout={pageLayout} />}
			rightSidebarHeader={<DetailSidebarHeader />}
			rightSidebarContent={<DetailSidebarContent />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(FileManagerApp);
