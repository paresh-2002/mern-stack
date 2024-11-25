import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";

const Navbar = () => {
  const {getProduct} = useProductsStore()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) { 
      getProduct(search);
    }
  }, [search, getProduct]);
  
  return (
    <div className="flex rounded-xl justify-between items-center px-7 bg-slate-400 h-20">
      <NavLink to="/">
        <img
          src="employee.png"
          alt="employee img"
          className="h-16 rounded-full cursor-pointer"
        />
      </NavLink>
    <div className="flex w-1/2 justify-end gap-10">
    <input
          type="text"
          placeholder="Search here..."
          className="w-1/3 py-2 px-4 drop-shadow-2xl  rounded-xl focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
    
      <NavLink
        to="/create-product"
        className=" p-3 text-center w-1/5  bg-white rounded-xl hover:bg-slate-600 hover:text-white"
      >
        Create Product
      </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
