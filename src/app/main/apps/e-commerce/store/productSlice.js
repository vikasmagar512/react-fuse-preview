import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	const response = await axios.get('/api/e-commerce-app/product', { params });
	const data = await response.data;
	return data;
});

export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async product => {
	const response = await axios.post('/api/receipts', product);
	const data = await response.data;
	return data;
});

const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState: null,
	reducers: {
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					item: '',
					handle: '',
					pattern: '',
					receiver: '',
					startDate: '',
					category: '',
					amount: '',
					contents: '',
					images: [],
					status: 0
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct } = productSlice.actions;

export default productSlice.reducer;
