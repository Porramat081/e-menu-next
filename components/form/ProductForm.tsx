"use client";

import { ProductObjType, ProductStatus } from "@/interfaces/Product";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ImageUploader, { PreviewItem } from "../ui/ImageUploader";
import { errorAlert, successAlert } from "@/utils/alertSwal";
import { createProduct, editProduct } from "@/apis/product";
import { useProduct } from "@/contexts/ProductContext";
import { X } from "lucide-react";
import CategoryDropdown from "../ui/CategoryDropdown";
import { getCategory } from "@/apis/category";
import useCategory from "@/stores/category";

const initProductObj: ProductObjType = {
  name: "",
  price: 0,
  stock: 1,
  description: "",
  category: "",
  status: ProductStatus.ACTIVE,
};

export default function ProductForm() {
  const [productStatus, setProductStatus] = useState("Active");
  const formRef = useRef<HTMLFormElement>(null);
  const { fetchProduct, selectedProduct, clearSelectedProduct } = useProduct();
  const {
    setCategoryItems,
    selectedCategory,
    categoryItems,
    changeSelectedCategory,
  } = useCategory();
  const [images, setImages] = useState<PreviewItem[]>([]);
  const [productObj, setProductObj] = useState<ProductObjType>(initProductObj);
  const clearForm = () => {
    setImages(() => []);
    if (formRef.current) {
      (
        formRef.current.querySelector("#product-name") as HTMLInputElement
      ).value = "";
      (
        formRef.current.querySelector("#product-price") as HTMLInputElement
      ).valueAsNumber = 0;
      (
        formRef.current.querySelector("#product-stock") as HTMLInputElement
      ).valueAsNumber = 1;
      (
        formRef.current.querySelector(
          "#product-description"
        ) as HTMLTextAreaElement
      ).value = "";
    }

    setProductObj(() => initProductObj);
  };
  const handleToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const handleClearSelect = () => {
    clearSelectedProduct();
    clearForm();
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (selectedProduct) {
        const res = await editProduct(selectedProduct.id, {
          name: productObj.name,
          price: productObj.price,
          stock: productObj.stock,
          category: selectedCategory,
          status: productStatus,
          description: productObj.description,
          imageFile: images.map((item) => item.file),
        });
        if (res.status === 200) {
          clearForm();
          clearSelectedProduct();
          await fetchProduct();
          successAlert("Update Product Successfully");
          handleToTop();
        }
      } else {
        const res = await createProduct({
          name: productObj.name,
          price: productObj.price,
          stock: productObj.stock,
          category: selectedCategory,
          status: productStatus,
          description: productObj.description,
          imageFile: images.map((item) => item.file),
        });
        if (res.status === 200) {
          clearForm();
          await fetchProduct();
          successAlert("Add Product Successfully");
          handleToTop();
        }
      }
    } catch (err) {
      errorAlert(
        selectedProduct ? "Edit Product Fail" : "Add Product Fail",
        err
      );
    }
  };
  const handleChangeObj = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    objProp: string
  ) => {
    setProductObj((prev) => ({ ...prev, [objProp]: e.target.value }));
  };

  const fetchCategory = async () => {
    try {
      const res = await getCategory();
      if (res.data?.length) {
        changeSelectedCategory(res.data[res.data.length - 1].name);
        setCategoryItems(res.data);
      }
    } catch (err) {
      errorAlert("Fetch Category Failure", err);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setImages(selectedProduct.images);
      setProductObj(() => ({
        name: selectedProduct.name,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        description: selectedProduct.description,
        category: selectedProduct.category,
        status: ProductStatus.ACTIVE,
      }));
      if (formRef.current) {
        (
          formRef.current.querySelector("#product-name") as HTMLInputElement
        ).value = selectedProduct.name;
        (
          formRef.current.querySelector("#product-price") as HTMLInputElement
        ).valueAsNumber = selectedProduct.price;
        (
          formRef.current.querySelector("#product-stock") as HTMLInputElement
        ).valueAsNumber = selectedProduct.stock;
        (
          formRef.current.querySelector(
            "#product-description"
          ) as HTMLTextAreaElement
        ).value = selectedProduct.description;

        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    fetchCategory();
  }, [selectedProduct]);

  return (
    <form
      ref={formRef}
      className="form-input space-y-4 relative max-w-[500px] mx-auto"
      onSubmit={handleSubmit}
    >
      {selectedProduct && (
        <button
          onClick={handleClearSelect}
          type="button"
          className="block cursor-pointer absolute top-5 right-5 bg-gray-400 rounded-full p-1"
        >
          <X size={16} />
        </button>
      )}
      <h2 className="font-bold text-xl text-center">
        {selectedProduct
          ? "Edit Product : " + selectedProduct.name
          : "Add New Product"}
      </h2>
      <div>
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          onChange={(e) => handleChangeObj(e, "name")}
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex-1">
          <label htmlFor="product-price">Price</label>
          <input
            className="text-end"
            type="number"
            id="product-price"
            onChange={(e) => handleChangeObj(e, "price")}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="product-stock">Stock</label>
          <input
            className="text-end"
            type="number"
            defaultValue={1}
            id="product-stock"
            onChange={(e) => handleChangeObj(e, "stock")}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between">
        <div className="flex-1">
          <label>Category</label>
          <CategoryDropdown
            items={categoryItems}
            selectedItem={selectedCategory}
            setSelectedItem={changeSelectedCategory}
          />
        </div>
        <div className="flex-1">
          <label>Status</label>
          <CategoryDropdown
            isStatus
            items={["Active", "Suspended", "Unavalible"]}
            selectedItem={productStatus}
            setSelectedItem={(str) => setProductStatus(str)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="product-description">Description</label>
        <textarea
          onChange={(e) => handleChangeObj(e, "description")}
          id="product-description"
          className="resize-y border rounded-md w-full h-20 p-4 text-sm"
        ></textarea>
      </div>
      <div>
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Image
        </span>
        <ImageUploader images={images} setImages={setImages} />
      </div>
      <div className="flex justify-center">
        <button className="action-btn bg-blue-400 w-[100px]">
          {selectedProduct ? "Edit" : "Submit"}
        </button>
      </div>
    </form>
  );
}
