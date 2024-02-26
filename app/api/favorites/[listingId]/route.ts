import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface Iparams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favoriteIds = currentUser.favoridIds || [];

  favoriteIds.push(listingId);
  console.log(favoriteIds);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoridIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favoriteIds = currentUser.favoridIds || [];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  console.log(favoriteIds);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoridIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}
