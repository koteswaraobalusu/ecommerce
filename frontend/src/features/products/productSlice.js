import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";

const initialState={
    products:[],
    selectedProduct:null,
    categories:[],
    subCategories:[],
    loading:false,
    error:null,
    count:0,
    next:null,
    previous:null
}

export const fetchProducts=createAsyncThunk("products/fetchProducts",async(params={},thunkAPI)=>{
    try{
        return await productService.getProducts(params);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || error.message )
    }
})

export const fetchProduct = createAsyncThunk(
    "products/fetchProduct",

    async (id, thunkAPI) => {

        try {

            return await productService.getProduct(
                id
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data ||
                error.message
            );

        }
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",

    async (productData, thunkAPI) => {

        try {

            return await productService.createProduct(
                productData
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data ||
                error.message
            );

        }
    }
);

export const editProduct = createAsyncThunk(
    "products/editProduct",

    async ({ id, productData }, thunkAPI) => {

        try {

            return await productService.updateProduct(
                id,
                productData
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data ||
                error.message
            );

        }
    }
);

export const removeProduct = createAsyncThunk(
    "products/removeProduct",

    async (id, thunkAPI) => {

        try {

            await productService.deleteProduct(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data ||
                error.message
            );

        }
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",

    async (_, thunkAPI) => {

        try {

            return await productService.getCategories();

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data ||
                error.message
            );

        }
    }
);

export const fetchSubCategories = createAsyncThunk(
    "products/fetchSubCategories",

    async (category, thunkAPI) => {

        try {

            return await productService.getSubCategories(category);

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data ||
                error.message
            );

        }
    }
);


const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        clearSelectedProduct:(state)=>{
            state.selectedProduct=null;
        },
        clearProductError:(state)=>{
            state.error=null;
        }
    },
    extraReducers:(builder) => {

        // Fetch Products
        builder

            .addCase(
                fetchProducts.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                fetchProducts.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products =
                        action.payload.results;

                    state.count =
                        action.payload.count;

                    state.next =
                        action.payload.next;

                    state.previous =
                        action.payload.previous;

                }
            )

            .addCase(
                fetchProducts.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // Fetch Single Product
        builder

            .addCase(
                fetchProduct.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                fetchProduct.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.selectedProduct =
                        action.payload;

                }
            )

            .addCase(
                fetchProduct.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // Add Product
        builder

            .addCase(
                addProduct.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                addProduct.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products.unshift(
                        action.payload
                    );

                }
            )

            .addCase(
                addProduct.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // Edit Product
        builder

            .addCase(
                editProduct.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                editProduct.fulfilled,
                (state, action) => {

                    state.loading = false;

                    const index =
                        state.products.findIndex(
                            product =>
                                product.id ===
                                action.payload.id
                        );

                    if (index !== -1) {

                        state.products[index] =
                            action.payload;

                    }

                    state.selectedProduct =
                        action.payload;

                }
            )

            .addCase(
                editProduct.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // Delete Product
        builder

            .addCase(
                removeProduct.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                removeProduct.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products =
                        state.products.filter(
                            product =>
                                product.id !==
                                action.payload
                        );

                }
            )

            .addCase(
                removeProduct.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // Categories
        builder

            .addCase(
                fetchCategories.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                fetchCategories.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.categories =
                        action.payload;

                }
            )

            .addCase(
                fetchCategories.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

            builder

            .addCase(
                fetchSubCategories.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                fetchSubCategories.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.subCategories =
                        action.payload;

                }
            )

            .addCase(
                fetchSubCategories.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );



    },
})

export const { clearSelectedProduct, clearProductError }=productSlice.actions;

export default productSlice.reducer;