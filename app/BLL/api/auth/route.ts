import { pusherServer } from "@/app/UI/libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextApiResponse) {
  const session = await getServerSession(request as unknown as NextApiRequest);
  if (!session?.user?.email) {
    return new NextResponse(null, { status: 403 });
  }

  const formData = await request.formData();
  const socketId = formData.get("socket_id");
  const channelName = formData.get("channel_name");

  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(
    socketId!.toString(),
    channelName!.toString(),
    data
  );

  return new NextResponse(JSON.stringify(authResponse), { status: 200 });
}
