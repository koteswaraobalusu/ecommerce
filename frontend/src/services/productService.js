import api from "./api";

export const getProducts=async (params={})=>{
    const response=await api.get('/products/',{ params, });

    return response.data;
}

export const getProduct=async (id)=>{
    const response=await api.get(`/products/${id}/`);

    return response.data;
}

export const createProduct=async (productData)=>{
    const response=await api.post('/products/',productData);

    return response.data;
}

export const updateProduct=async (id,productData)=>{
    const response=await api.patch('/products/${id}/',productData);

    return response.data;
}

export const deleteProduct=async (id)=>{
    const response=await api.delete('/products/${id}/');

    return response.data;
}

export const getCategories=async ()=>{
    const response=await api.get('/categories/');

    return response.data;
}

export const getSubCategories=async (category)=>{
    const response=await api.get('/sub-categories/${category}/');

    return response.data;
}

const productService={ getProducts, getProduct, createProduct, updateProduct, deleteProduct, getCategories, getSubCategories }

export default productService;