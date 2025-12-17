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
  const selectProduct = async (product: ProductListType) => {
    const images2 = await Promise.all(
      product.images.map(
        async (item: {
          downloadUrl: string;
          url: string;
          file: File;
          fileName: string;
        }) => {
          const path = item.downloadUrl ?? item.url;
          if (item.file instanceof File) return { url: path, file: item.file };
          const res = await fetch(
            process.env.NEXT_PUBLIC_IMAGEURL + path.substring(1)
          );
          const blob = await res.blob();

          const file = new File([blob], item.fileName, {
            type: blob.type,
          });

          return {
            url:
              process.env.NEXT_PUBLIC_IMAGEURL + item.downloadUrl.substring(1),
            file,
          };
        }
      )
    );

    product.images = images2;

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
            images: item.images,
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
