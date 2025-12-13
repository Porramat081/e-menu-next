"use client";

import { getProducts } from "@/apis/product";
import { ProductFetchType, ProductListType } from "@/interfaces/Product";
import { errorAlert } from "@/utils/alertSwal";
import { createContext, useContext, useState } from "react";

interface ProductContextType {
  productList: ProductListType[];
  addProductList: (newProduct: ProductListType) => void;
  fetchProduct: () => Promise<void>;
  selectProduct: (product: ProductListType) => void;
  selectedProduct: ProductListType | null;
  clearSelectedProduct: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductListType | null>(null);
  const addProductList = (newProduct: ProductListType) => {
    setProductList((prev) => [...prev, newProduct]);
  };
  const selectProduct = (product: ProductListType) => {
    setSelectedProduct(product);
  };
  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };
  const fetchProduct = async () => {
    try {
      const res = await getProducts();
      const initList: ProductListType[] = [];
      if (res.data && res.data?.length) {
        res.data.forEach((item: ProductFetchType) => {
          const newProductObj = {
            name: item.name,
            id: item.id,
            description: item.description,
            price: item.price,
            stock: item.stock,
            category: item.category?.name,
            picUrl:
              item.images.length > 0
                ? (item.images[0]?.downloadUrl as string).substring(8)
                : "",
          };
          initList.push(newProductObj);
        });
        setProductList(() => initList);
      }
    } catch (err) {
      errorAlert("Fetching data failure", err);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        productList,
        addProductList,
        fetchProduct,
        selectProduct,
        selectedProduct,
        clearSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
