import getCurrentUser from "@/app/DAL/user/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/UI/libs/pusher";
import createConversationGroup from "@/app/DAL/conversations/createConversationGroup";
import getExistConversation from "@/app/DAL/conversations/getExistConversation";
import createConversation from "@/app/DAL/conversations/createConversation";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // 创建群聊
    if (isGroup) {
      const newConversation = await createConversationGroup(
        name,
        isGroup,
        members,
        currentUser.id
      );

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    // 查找已存在对话
    const existingConversations = await getExistConversation(
      currentUser.id,
      userId
    );

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // 新建对话
    const newConversation = await createConversation(currentUser.id, userId);

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
