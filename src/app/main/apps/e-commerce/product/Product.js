import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import clsx from 'clsx';

import FuseUtils from '@fuse/utils';
import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import withReducer from 'app/store/withReducer';
import { saveProduct, newProduct, getProduct } from '../store/productSlice';
import reducer from '../store';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));
function Product(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState(1);
	const classes = useStyles(props);


	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				alert('newProduct')
				dispatch(newProduct());
			} else {
				dispatch(getProduct(routeParams));
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((product && !form) || (product && form && product.id !== form.id)) {
			setForm(product);
		}
	}, [form, product, setForm]);
	function setFeaturedImage(id) {
		setForm(_.set({ ...form }, 'featuredImageId', id));
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(
				_.set({ ...form }, `images`, [
					{
						id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image'
					},
					...form.images
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function canBeSubmitted() {
		// return form.images.length > 0 && 
		return !_.isEqual(product, form);
	}

	if ((!product || (product && routeParams.productId !== product.id)) && routeParams.productId !== 'new') {
		return <FuseLoading />;
    }
    function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}
	async function submitForm(){
		await dispatch(saveProduct({
			...form,
			 images:[]
			})
		)
		props.history.push('/apps/e-commerce/receipts')
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/receipts"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Receipts</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images && form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={_.find(form.images, { id: form.featuredImageId }).url}
											alt={form.item}
										/>
									) : (
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={form.item}
										/>
									)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.item ? form.item : 'New Receipt'}
										</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => submitForm()}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			content={
				form && (
						<div className="p-16 sm:p-24 max-w-2xl">
							<div className="flex -mx-4">
								<TextField
									className="mt-8 mb-16 mx-4"
									name="startDate"
									label="Start Date"
									type="datetime-local"
									InputLabelProps={{
										shrink: true
									}}
									// inputProps={{
									// 	max: dueDate
									// }}
									value={form.startDate}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
                                <FormControl className="flex w-full mt-8 mb-16 sm:w-420 mx-4" variant="outlined">
                                    <InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
                                    <Select
                                        value={selectedCategory}
                                        onChange={handleSelectedCategory}
                                        input={
                                            <OutlinedInput
                                                labelWidth={'category'.length * 9}
                                                name="category"
                                                id="category-label-placeholder"
                                            />
                                        }
                                    >
                                        {[{label:'A',id:1},{label:'B',id:2}].map(category => (
                                            <MenuItem value={category.id} key={category.id}>
                                                {category.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
							</div>
							<div className="flex -mx-4">
								<TextField
									className="mt-8 mb-16 mx-4"
									error={form.item === ''}
									required
									label="Item"
									autoFocus
									id="item"
									name="item"
									value={form.item}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16 mx-4"
									error={form.pattern === ''}
									required
									label="Pattern"
									autoFocus
									id="pattern"
									name="pattern"
									value={form.pattern}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
							<TextField
								className="mt-8 mb-16"
								error={form.contents === ''}
								required
								label="Contents"
								autoFocus
								id="contents"
								name="contents"
								value={form.contents}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<div className="flex -mx-4">
								<TextField
									className="mt-8 mb-16 mx-4"
									error={form.receiver === ''}
									required
									label="Receiver"
									autoFocus
									id="receiver"
									name="receiver"
									value={form.receiver}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16 mx-4"
									error={form.amount === ''}
									required
									label="Amount"
									autoFocus
									id="amount"
									name="amount"
									value={form.amount}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
                            
                            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                                <label
                                    htmlFor="button-file"
                                    className={clsx(
                                        classes.productImageUpload,
                                        'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                                    )}
                                >
                                    <input
                                        accept="image/*"
                                        className="hidden"
                                        id="button-file"
                                        type="file"
                                        onChange={handleUploadChange}
                                    />
                                    <Icon fontSize="large" color="action">
                                        cloud_upload
                                    </Icon>
                                </label>
                            </div>
							{form.images.map(media => (
								<div
									onClick={() => setFeaturedImage(media.id)}
									onKeyDown={() => setFeaturedImage(media.id)}
									role="button"
									tabIndex={0}
									className={clsx(
										classes.productImageItem,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
										media.id === form.featuredImageId && 'featured'
									)}
									key={media.id}
								>
									<Icon className={classes.productImageFeaturedStar}>star</Icon>
									<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
								</div>
							))}
						</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Product);
