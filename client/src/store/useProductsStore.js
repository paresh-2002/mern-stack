import { create } from "zustand";
const API_URL = process.env.API_URL
export const useProductsStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (id, newProducts) => {
    console.log(id, newProducts)
    const product = { ...newProducts };
    if (!product.name || !product.price || !product.image) {
      return { status: false, message: "Please fill in all fields" };
    }

    try {
      const response = await fetch(`${API_URL}${id ? "/" + id : ""}`,
        {
          method: `${id ? "PUT" : "POST"}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })

        const data = await response.json();
        if(id){
          set((state) => ({
            products: state.products.map((product) => (product._id === id ? data.data : product)),
          }));
        }
        set((state) => ({ products: [...state.products, data.data] }));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("client Side add", error);
    } 
  },

  getProduct: async (searchProduct) => {
    const res = await fetch(API_URL);
    const data = await res.json();
    set({ products: data.data, searchProduct });
  },

  getProductById: async (id) =>{
    const response = await fetch(
      `${API_URL}/${id}`
    );
    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const data = await response.json();
    if (!data) {
      console.warn(`Record with id ${id} not found`);
      return;
    }
  set({products:data.data})
},
  
  deleteProduct: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { status: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
}));
