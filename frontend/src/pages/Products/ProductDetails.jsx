import { useEffect } from "react";
import { useDispatch, useSelector,} from "react-redux";


import { useParams } from "react-router-dom";
import { fetchProduct } from "../../features/products/productSlice";
import PageNotFound from "../NotFound/PageNotFound";


const ProductDetails = () => {

    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch();

    const {
        selectedProduct,
        loading,
        error,
    } = useSelector(
        state => state.products
    );


    useEffect(() => {

        dispatch(fetchProduct(id));

    }, [dispatch, id]);


    if (loading) {

        return (
            <h2 className="text-center mt-10">
                Loading product...
            </h2>
        );

    }


    if (error) {

        return (
            <PageNotFound error={error} />
        );

    }


    if (!selectedProduct) {

        return null;

    }


    return (

        <div className="max-w-6xl mx-auto px-4 py-10">

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-10
            ">


                {/* Image */}

                <div className="
                    flex
                    items-center
                    justify-center
                    border
                    rounded-lg
                    p-8
                ">

                    {selectedProduct.image ? (

                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="max-h-96 object-contain"
                        />

                    ) : (

                        <div className="text-gray-400">
                            No Image
                        </div>

                    )}

                </div>


                {/* Details */}

                <div>

                    <p className="text-gray-500">
                        {selectedProduct.category?.name}
                    </p>


                    <h1 className="
                        text-4xl
                        font-bold
                        mt-2
                    ">
                        {selectedProduct.name}
                    </h1>


                    <p className="
                        text-3xl
                        font-bold
                        mt-6
                    ">
                        ₹{selectedProduct.price}
                    </p>


                    <p className="
                        text-gray-600
                        mt-6
                        leading-7
                    ">
                        {selectedProduct.description}
                    </p>


                    <p className="mt-6">

                        {selectedProduct.stock > 0 ? (

                            <span className="text-green-600">
                                In Stock
                            </span>

                        ) : (

                            <span className="text-red-600">
                                Out of Stock
                            </span>

                        )}

                    </p>


                    <button
                        disabled={
                            selectedProduct.stock === 0
                        }
                        className="
                            mt-6
                            w-full
                            bg-black
                            text-white
                            py-3
                            rounded-lg
                            disabled:bg-gray-400
                        "
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    );

};


export default ProductDetails;