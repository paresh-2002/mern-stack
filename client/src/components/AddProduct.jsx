import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(true);
  const {getProductById, products, createProduct} = useProductsStore()


  useEffect(() => {
    async function fetchData() {
      if (!params.id) return;
      setIsNew(false);
      await getProductById(params.id);
    }
    fetchData();
  }, [getProductById, params.id, isNew]);

  useEffect(() => {
    if (products) {
      setForm({
        name: products.name || "",
        price: products.price || "",
        image: products.image || "",
      });
    }
  }, [products]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await createProduct(params.id, form)
      setForm({ name: "", price: "", image: "" });
      navigate("/");
  };
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  return (
    <div className="w-1/3 m-auto rounded-md mt-24">
      <h2 className="text-3xl text-slate-400 text-center">Product Details</h2>
      <form onSubmit={onSubmit} className="m-3 p-2">
        <label htmlFor="name" className="text-slate-500">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter Name..."
          className="w-full py-2 px-4 drop-shadow-2xl my-3 rounded-xl focus:outline-none "
          required
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        <label htmlFor="price" className="text-slate-500">
          Price
        </label>
        <input
          id="price"
          type="text"
          placeholder="Enter Price..."
          className="w-full py-2 px-4 drop-shadow-2xl my-3 rounded-xl focus:outline-none"
          required
          value={form.price}
          onChange={(e) => updateForm({ price: e.target.value })}
        />
        <label htmlFor="image" className="text-slate-500">
          Image
        </label>
        <input
          id="image"
          type="text"
          placeholder="Enter Image..."
          className="w-full py-2 px-4 drop-shadow-2xl my-3 rounded-xl focus:outline-none"
          required
          value={form.image}
          onChange={(e) => updateForm({ image: e.target.value })}
        />

        <br />
        <button className="w-1/2 bg-slate-500 py-2 px-5 text-white hover:bg-white drop-shadow-2xl hover:text-slate-500 mt-4 rounded-xl">
          Add
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
