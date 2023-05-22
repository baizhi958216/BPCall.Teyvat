import prisma from "@/app/BLL/libs/prismadb";

const deleteConversation = async (
  conversationId: string,
  currentUserId: string
) => {
  return await prisma.conversation.deleteMany({
    where: {
      id: conversationId,
      userIds: {
        hasSome: [currentUserId],
      },
    },
  });
};

export default deleteConversation;
