import { axiosInstance } from "@/utils/axiosInstance";

interface CreatedProductType {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  imageFile: File[];
  status: string;
}

export const getProducts = async () => {
  const res = await axiosInstance.get("products/all", {
    withCredentials: true,
  });
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`products/product/${id}/product`, {
    withCredentials: true,
  });
  return res.data;
};

export const editProduct = async (
  productId: string,
  productBody: CreatedProductType
) => {
  const formData = new FormData();
  const productObj = {
    name: productBody.name,
    description: productBody.description || "",
    price: productBody.price,
    stock: productBody.stock,
    categoryName: productBody.category || "",
  };
  formData.append("request", JSON.stringify(productObj));
  if (productBody.imageFile.length > 0) {
    productBody.imageFile.forEach((file) => {
      formData.append("files", file);
    });
  }
  const endpointUrl =
    (process.env.NEXT_PUBLIC_BASEURL || "") +
    "products/product/" +
    productId +
    "/update";
  const res = await fetch(endpointUrl, {
    method: "PUT",
    body: formData,
    credentials: "include",
    mode: "cors",
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(`${result.message}`);
  }
  return res;
};

export const createProduct = async (productBody: CreatedProductType) => {
  const formData = new FormData();
  const productObj = {
    name: productBody.name,
    description: productBody.description || "",
    price: productBody.price,
    stock: productBody.stock,
    categoryName: productBody.category || "",
  };

  formData.append("request", JSON.stringify(productObj));

  if (productBody.imageFile.length > 0) {
    productBody.imageFile.forEach((file) => {
      formData.append("files", file);
    });
  }
  const endpointUrl = (process.env.NEXT_PUBLIC_BASEURL || "") + "products/add";
  const res = await fetch(endpointUrl, {
    method: "POST",
    body: formData,
    credentials: "include",
    mode: "cors",
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(`${result.message}`);
  }
  return res;
};

export const deleteProduct = async (productId: string) => {
  const res = await axiosInstance.delete(
    "products/product/" + productId + "/delete",
    { withCredentials: true }
  );
  return res.data;
};
