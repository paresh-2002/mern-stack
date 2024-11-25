import { useEffect, useMemo, useState } from "react";
import Product from "./Product";
import { useProductsStore } from "../store/useProductsStore";

export default function ProductsList() {
  const { getProduct, products, searchProduct } = useProductsStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProduct("");
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [getProduct]);

  const filteredProducts = useMemo(() => {
    if (!searchProduct) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  function productsList() {
    if (filteredProducts.length === 0) {
      return <p>No products found.</p>;
    }

    return filteredProducts.map((product) => (
      <Product product={product} key={product._id} />
    ));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4 w-7/12 m-auto">All Products</h3>
      <div className="rounded-lg overflow-hidden w-7/12 m-auto">
        <div className="relative flex flex-wrap items-center gap-3 w-full overflow-auto">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            productsList()
          )}
        </div>
      </div>
    </>
  );
}
