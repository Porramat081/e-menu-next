import ProductForm from "@/components/form/ProductForm";
import ProductList from "@/components/form/ProductList";
import { ProductProvider } from "@/contexts/ProductContext";

export default function Page() {
  return (
    <div>
      <div className="space-y-2 px-2">
        <ProductProvider>
          <ProductList />
          <ProductForm />
        </ProductProvider>
      </div>
    </div>
  );
}
