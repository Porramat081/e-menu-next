"use client";

import ThumbnailPic from "../ui/ThumbnailPic";
import { useEffect } from "react";
import { useProduct } from "@/contexts/ProductContext";
import DropdowmMenu from "../ui/DropdownBtn";

export default function ProductList() {
  const { productList, fetchProduct } = useProduct();

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="form-input mt-2 px-0! md:px-8!">
      <h2 className="font-bold text-xl text-center mb-3">Product List</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Pic</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => (
              <tr key={"product_list" + index}>
                <td className="flex items-center justify-center">
                  <ThumbnailPic imgUrl={item.picUrl} alt="product thumbnail" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <DropdowmMenu
                    triggerTitle=""
                    listMenu={["menu1", "menu2"]}
                    isLast={index === productList.length - 1}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
