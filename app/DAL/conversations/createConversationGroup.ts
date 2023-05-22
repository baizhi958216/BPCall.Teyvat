import prisma from "@/app/BLL/libs/prismadb";

const createConversationGroup = async (
  name: any,
  isGroup: any,
  members: any,
  currentUserId: any
) => {
  return await prisma.conversation.create({
    data: {
      name,
      isGroup,
      users: {
        connect: [
          ...members.map((member: { value: string }) => ({
            id: member.value,
          })),
          {
            id: currentUserId,
          },
        ],
      },
    },
    include: {
      users: true,
    },
  });
};

export default createConversationGroup;
