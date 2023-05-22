import prisma from "@/app/BLL/libs/prismadb";

const createMessage = async (
  reqMessage: any,
  reqImage: any,
  reqConversationId: any,
  currentUserId: string
) => {
  return await prisma.message.create({
    data: {
      body: reqMessage,
      image: reqImage,
      conversation: {
        connect: {
          id: reqConversationId,
        },
      },
      sender: {
        connect: {
          id: currentUserId,
        },
      },
      seen: {
        connect: {
          id: currentUserId,
        },
      },
    },
    include: {
      seen: true,
      sender: true,
    },
  });
};

export default createMessage;
