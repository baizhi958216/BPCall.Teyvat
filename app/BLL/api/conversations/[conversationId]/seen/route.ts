import getCurrentUser from "@/app/DAL/user/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/UI/libs/pusher";
import getMessageSeen from "@/app/DAL/conversations/getMessageSeen";
import updateMessageSeen from "@/app/DAL/conversations/updateMessageSeen";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await getMessageSeen(conversationId!);

    if (!conversation) {
      return new NextResponse("Invalid ID");
    }

    // 最后一条消息
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // 设置已读
    const updatedMessage = await updateMessageSeen(
      lastMessage.id,
      currentUser.id
    );

    await pusherServer.trigger(currentUser.email!, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGE_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
