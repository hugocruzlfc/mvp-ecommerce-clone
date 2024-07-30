import ProductGridSection from "@/components/products/ProductGridSection";
import { cache } from "@/lib/cache";
import prisma from "@/lib/prisma";

const getMostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestProducts"]);

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection
        title="Newest"
        productsFetcher={getNewestProducts}
      />
    </main>
  );
}
