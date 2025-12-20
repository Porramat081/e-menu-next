"use client";

import ThumbnailPic from "../ui/ThumbnailPic";
import { useEffect, useRef } from "react";
import { useProduct } from "@/contexts/ProductContext";
import DropdowmMenu from "../ui/DropdownBtn";
import { useRouter } from "next/navigation";
import { ProductListType } from "@/interfaces/Product";
import { confirmBox, errorAlert, successAlert } from "@/utils/alertSwal";
import { deleteProduct } from "@/apis/product";
import { Plus } from "lucide-react";

export default function ProductList() {
  const { productList, fetchProduct, selectProduct } = useProduct();
  const tableRef = useRef<HTMLTableElement>(null);
  const router = useRouter();

  const openViewProduct = (productId: string) => {
    router.push("/dashboard/product/" + productId);
  };

  const handleEdit = (product: ProductListType) => {
    console.log(product);
    selectProduct(product);
  };

  const handleDelete = async (productId: string) => {
    try {
      const result = await confirmBox("Do you want to delete this product?");

      if (result.isConfirmed) {
        const res = await deleteProduct(productId);

        if (res.message) {
          successAlert("Delete Product Successfully");
          await fetchProduct();
        }
      }
    } catch (err) {
      errorAlert("Delete Product Fail", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="form-input mt-2 px-0! md:px-8!">
      <h2 className="relative font-bold text-xl text-center mb-3">
        Product List
        <div className="absolute right-5 top-0">
          <button
            onClick={() =>
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              })
            }
            type="button"
            className="cursor-pointer rounded-full bg-blue-400 text-white p-1"
          >
            <Plus size={16} />
          </button>
        </div>
      </h2>
      <div className="overflow-x-auto overflow-visible!">
        <table ref={tableRef} className="table overflow-y-visible!">
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
            {productList.length > 0 ? (
              <>
                {productList.map((item, index) => (
                  <tr key={"product_list" + index}>
                    <td className="flex items-center justify-center">
                      <ThumbnailPic
                        imgUrl={item.picUrl}
                        alt="product thumbnail"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td className="overflow-y-visible!">
                      <DropdowmMenu
                        triggerTitle=""
                        listMenu={[
                          <button
                            className="btn-dropdown"
                            type="button"
                            onClick={() => openViewProduct(item.id)}
                          >
                            View
                          </button>,
                          <button
                            onClick={() => handleEdit(item)}
                            className="btn-dropdown"
                            type="button"
                          >
                            Edit
                          </button>,
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn-dropdown"
                            type="button"
                          >
                            Delete
                          </button>,
                        ]}
                        isLast={index === productList.length - 1}
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  -- Have no product yet --
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
