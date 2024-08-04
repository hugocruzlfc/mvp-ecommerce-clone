"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function userOrderExists(email: string, productId: string) {
  return (
    (await prisma.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  );
}

export async function deleteOrder(id: string) {
  const order = await prisma.order.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}
