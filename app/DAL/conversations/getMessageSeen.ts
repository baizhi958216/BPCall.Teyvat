import prisma from "@/app/BLL/libs/prismadb";

const getMessageSeen = async (conversationId: string) => {
  return await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      messages: {
        include: {
          seen: true,
        },
      },
      users: true,
    },
  });
};

export default getMessageSeen;
