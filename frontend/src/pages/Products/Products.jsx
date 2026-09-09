// 

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../features/products/productSlice";
import ProductCard from "../../components/ProductCard";





const Products = () => {

    const dispatch = useDispatch();

    const {
        products,
        categories,
        loading,
        error,
    } = useSelector(
        state => state.products
    );


    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    // Sorting
    const [ordering, setOrdering] = useState("-created_at");

    // Current page
    const [page, setPage] = useState(1);
    // debouncing

    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {

        dispatch(
            fetchProducts({
                search,
                category,
                ordering,
                page,
            })
        );

    }, [dispatch, search, category, ordering, page]);


    useEffect(() => {

        dispatch(fetchCategories());

    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <h1 className="text-3xl font-bold mb-8">
                Products
            </h1>


            {/* Filters */}

            <div className="
                flex
                flex-col
                md:flex-row
                gap-4
                mb-8
            ">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        border
                        border-gray-300
                        rounded-lg
                        px-4
                        py-3
                        w-full
                        md:w-1/2
                        outline-none
                        focus:border-black
                    "
                />


                {/* Category */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="
                        border
                        border-gray-300
                        rounded-lg
                        px-4
                        py-3
                        w-full
                        md:w-1/4
                        outline-none
                    "
                >

                    <option value="">
                        All Categories
                    </option>


                    { categories.results && categories.results.map((cat) => (

                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.name}
                        </option>

                    ))}

                </select>

            </div>


            {/* Products */}

            {loading && (
                <h2 className="text-center mt-10">
                    Loading products...
                </h2>
            )}


            {error && (
                <h2 className="
                    text-center
                    mt-10
                    text-red-500
                ">
                    Failed to load products
                </h2>
            )}


            {!loading && !error && (

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-6
                ">

                    {products.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};


export default Products;