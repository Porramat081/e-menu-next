interface CreatedProductType {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  imageFile: File[];
}

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

  return res;
};
