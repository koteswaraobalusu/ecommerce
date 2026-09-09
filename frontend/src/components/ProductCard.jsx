import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {
    console.log(product)
    return (

        <div className="border rounded-lg p-4 shadow-sm">

            {/* Product Image */}
            <div className="h-56 flex items-center justify-center">

                {product.image ? (

                    <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />

                ) : (

                    <div className="text-gray-400">
                        No Image
                    </div>

                )}

            </div>


            {/* Product Information */}
            <div className="mt-4">

                <h2 className="text-lg font-semibold">
                    {product.name}
                </h2>


                <p className="text-gray-500 mt-1">
                    {product.category?.name}
                </p>


                <p className="text-xl font-bold mt-2">
                    ₹{product.price}
                </p>


                <p className="text-sm text-gray-500 mt-1">
                    {product.stock > 0
                        ? `${product.stock} available`
                        : "Out of stock"}
                </p>


                <Link
                    to={`/products/${product.id}`}
                    className="block text-center mt-4 bg-black text-white py-2 rounded"
                >
                    View Details
                </Link>

            </div>

        </div>

    );

};


export default ProductCard;