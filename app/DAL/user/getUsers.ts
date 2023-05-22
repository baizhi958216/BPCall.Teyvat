import prisma from "@/app/BLL/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/BLL/api/auth/provider/route";

const getUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma?.user.findMany({
      orderBy: {
        createAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
