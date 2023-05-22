import prisma from "@/app/BLL/libs/prismadb";

const updateConversation = async (
  conversationId: string,
  newMessageId: string
) => {
  return await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageAt: new Date(),
      messages: {
        connect: {
          id: newMessageId,
        },
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          seen: true,
        },
      },
    },
  });
};

export default updateConversation;
