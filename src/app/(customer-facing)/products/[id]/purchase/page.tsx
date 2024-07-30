import { notFound } from "next/navigation";
import Stripe from "stripe";

import prisma from "@/lib/prisma";
import { ProductCheckoutForm } from "@/components/products/ProductCheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "EUR",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <ProductCheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
