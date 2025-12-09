import ProductForm from "@/components/form/ProductForm";
import ProductList from "@/components/form/ProductList";

export default function Page() {
  return (
    <div>
      <h2>Product Page</h2>
      <div className="space-y-2 px-2">
        <ProductList />
        <ProductForm />
      </div>
    </div>
  );
}
