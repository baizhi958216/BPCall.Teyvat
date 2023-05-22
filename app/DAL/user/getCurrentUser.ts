import prisma from "@/app/BLL/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/BLL/api/auth/[...nextauth]/route";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
