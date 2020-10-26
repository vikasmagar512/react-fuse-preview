import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
	const response = await axios.get('/api/e-commerce-app/products');
	const data = await response.data;

	return data;
});

const productsAdapter = createEntityAdapter({});

export const { 
	selectAll: selectProducts,
	selectById: selectProductById,
	selectEntities: selectFilesEntities,
	// selectById: selectFileById
} = productsAdapter.getSelectors(
	state => {
		return state.eCommerceApp.products
	}
);

const productsSlice = createSlice({
	name: 'eCommerceApp/products',
	initialState: productsAdapter.getInitialState({
		searchText: '',
		selectedItemId: '12',
		selectedItems: []
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		setSelectedItem: (state, action) => {
			state.selectedItemId = action.payload;
		},
		setSelectedItems: (state, action) => {
			state.selectedItems = action.payload;
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText, setSelectedItem, setSelectedItems } = productsSlice.actions;

export default productsSlice.reducer;
