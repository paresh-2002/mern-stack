import React from "react";
import { Link } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";

const Product = ({ product }) => {
const {deleteProduct} = useProductsStore()
const handleDeleteProduct = async (id) => {
  const {success,message} = await deleteProduct(id)
  console.log('success :', success)
    console.log('Message :', message)
}
  return (
    <div className="p-3 border rounded-md m-2 ">
      <img src={product.image} alt={product.name} className="h-52 w-52 hover:w-[250px] hover:h-[250px] ease-in-out " />
      <h3 className="text-2xl mt-3 text-slate-400">{product.name}</h3>
      <h4 className="text-xl mt-2">${product.price}</h4>
      <div className="flex gap-2 justify-between mt-3">
        <Link
          className="inline-flex w-1/2 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-green-100 h-9 rounded-md px-3"
          to={`/edit/${product._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex w-1/2 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-red-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            handleDeleteProduct(product._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
