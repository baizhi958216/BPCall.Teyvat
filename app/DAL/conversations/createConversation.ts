import prisma from "@/app/BLL/libs/prismadb";

const createConversation = async (currentUserId: string, userId: string) => {
  return await prisma.conversation.create({
    data: {
      users: {
        connect: [
          {
            id: currentUserId,
          },
          {
            id: userId,
          },
        ],
      },
    },
    include: {
      users: true,
    },
  });
};

export default createConversation;
