import { ProductForm } from "@/components/products/ProductForm";
import { PageHeader } from "@/components/products/ProductHeader";
import prisma from "@/lib/prisma";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id } });

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
