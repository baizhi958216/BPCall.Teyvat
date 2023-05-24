import getCurrentUser from "@/app/DAL/user/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/UI/libs/pusher";
import createMessage from "@/app/DAL/message/createMessage";
import updateConversation from "@/app/DAL/message/updateConversation";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, audio, conversationId } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("未登录用户...", { status: 401 });
    }

    // 发送消息
    const newMessage = await createMessage(
      message,
      audio,
      image,
      conversationId,
      currentUser.id
    );

    // 发送消息后更新聊天历史
    const updatedConversation = await updateConversation(
      conversationId,
      newMessage.id
    );

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        message: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "消息发送失败...");
    return new NextResponse("消息发送失败...", { status: 500 });
  }
}
