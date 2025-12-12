"use client";

import { ProductObjType, ProductStatus } from "@/interfaces/Product";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import ImageUploader, { PreviewItem } from "../ui/ImageUploader";
import { errorAlert, successAlert } from "@/utils/alertSwal";
import { createProduct } from "@/apis/product";
import { useProduct } from "@/contexts/ProductContext";

const initProductObj: ProductObjType = {
  name: "",
  price: 0,
  stock: 1,
  description: "",
  category: "",
  status: ProductStatus.ACTIVE,
};

export default function ProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { fetchProduct } = useProduct();
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await createProduct({
        name: productObj.name,
        price: productObj.price,
        stock: productObj.stock,
        imageFile: images.map((item) => item.file),
      });
      if (res.status === 200) {
        clearForm();
        await fetchProduct();
        successAlert("Add Product Successfully");
      }
    } catch (err) {
      errorAlert("Add Product Fail", err);
    }
  };
  const handleChangeObj = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    objProp: string
  ) => {
    setProductObj((prev) => ({ ...prev, [objProp]: e.target.value }));
  };
  return (
    <form
      ref={formRef}
      className="form-input space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-xl text-center">Add New Product</h2>
      <div>
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          onChange={(e) => handleChangeObj(e, "name")}
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div>
          <label htmlFor="product-price">Price</label>
          <input
            className="text-end"
            type="number"
            id="product-price"
            onChange={(e) => handleChangeObj(e, "price")}
          />
        </div>
        <div>
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
      <div>
        <button className="action-btn bg-blue-400">Submit</button>
        <button
          type="button"
          onClick={clearForm}
          className="action-btn bg-red-400"
        >
          clear
        </button>
        <button type="button" onClick={() => console.log(productObj)}>
          Check
        </button>
      </div>
    </form>
  );
}
