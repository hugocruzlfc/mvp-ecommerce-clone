import { ProductForm } from "@/components/products/ProductForm";
import { PageHeader } from "@/components/products/ProductHeader";

export default function NewProductPage() {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </>
  );
}
