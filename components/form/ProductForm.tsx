"use client";

import { ProductObjType, ProductStatus } from "@/interfaces/Product";
import { ChangeEvent, FormEvent, useState } from "react";
import ImageUploader, { PreviewItem } from "../ui/ImageUploader";

const initProductObj: ProductObjType = {
  name: "",
  price: 0,
  stock: 1,
  description: "",
  status: ProductStatus.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ProductForm() {
  const [images, setImages] = useState<PreviewItem[]>([]);
  const [productObj, setProductObj] = useState<ProductObjType>(initProductObj);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("add product");
    console.log(productObj);
    console.log(images);
  };
  const handleChangeObj = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    objProp: string
  ) => {
    setProductObj((prev) => ({ ...prev, [objProp]: e.target.value }));
  };
  return (
    <form className="form-input space-y-4" onSubmit={handleSubmit}>
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
            onChange={(e) => handleChangeObj(e, "price")}
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
      </div>
    </form>
  );
}
