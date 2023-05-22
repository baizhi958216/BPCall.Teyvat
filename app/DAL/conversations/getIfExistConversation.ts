import prisma from "@/app/BLL/libs/prismadb";

const getIfExistConversation = async (conversationId: string) => {
  return await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
    },
  });
};

export default getIfExistConversation;
