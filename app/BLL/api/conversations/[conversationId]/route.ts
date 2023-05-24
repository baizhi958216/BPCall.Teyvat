import getCurrentUser from "@/app/DAL/user/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/UI/libs/pusher";
import getIfExistConversation from "@/app/DAL/conversations/getIfExistConversation";
import deleteConversation from "@/app/DAL/conversations/deleteConversation";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!conversationId) {
      return new NextResponse("未登录用户...", { status: 401 });
    }

    // 删除聊天前确认是否存在该聊天
    const existingConversation = await getIfExistConversation(conversationId);

    if (!existingConversation) {
      return new NextResponse("会话不存在", { status: 400 });
    }

    // 删除聊天
    const deletedConversation = await deleteConversation(
      conversationId,
      currentUser!.id
    );

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, "删除会话失败...");
    return new NextResponse("删除会话失败...", { status: 500 });
  }
}
