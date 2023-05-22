import prisma from "@/app/BLL/libs/prismadb";

const updateUser = async (user: {
  currentUserId: string;
  image: string;
  name: string;
}) => {
  return await prisma.user.update({
    where: {
      id: user.currentUserId,
    },
    data: {
      image: user.image,
      name: user.name,
    },
  });
};

export default updateUser;
