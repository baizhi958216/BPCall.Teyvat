import prisma from "@/app/BLL/libs/prismadb";

const updateMessageSeen = async (
  lastMessageId: string,
  currentUserId: string
) => {
  return await prisma.message.update({
    where: {
      id: lastMessageId,
    },
    include: {
      sender: true,
      seen: true,
    },
    data: {
      seen: {
        connect: {
          id: currentUserId,
        },
      },
    },
  });
};

export default updateMessageSeen;
