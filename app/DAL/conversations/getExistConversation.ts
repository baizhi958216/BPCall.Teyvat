import prisma from "@/app/BLL/libs/prismadb";

const getExistConversation = async (currentUserId: string, userId: string) => {
  return await prisma.conversation.findMany({
    where: {
      OR: [
        {
          userIds: {
            equals: [currentUserId, userId],
          },
        },
        {
          userIds: {
            equals: [userId, currentUserId],
          },
        },
      ],
    },
  });
};

export default getExistConversation;
