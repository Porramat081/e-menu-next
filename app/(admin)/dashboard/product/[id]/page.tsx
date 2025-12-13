"use client";

import { useParams } from "next/navigation";
import useLoading from "@/stores/loader";
import { errorAlert } from "@/utils/alertSwal";
import { getProductById } from "@/apis/product";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams();
  const { isLoading } = useLoading();

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id as string);
      console.log(res);
    } catch (err) {
      errorAlert("Getting product fail", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return <>{isLoading && <div>{id}</div>}</>;
}
