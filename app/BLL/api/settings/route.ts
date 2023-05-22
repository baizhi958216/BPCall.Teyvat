import getCurrentUser from "@/app/DAL/user/getCurrentUser";
import { NextResponse } from "next/server";
import updateUser from "@/app/DAL/user/updateUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    // 更新用户资料
    const updatedUser = await updateUser({
      ...body,
      currentUserId: currentUser.id,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "ERROR_SETTINGS");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
