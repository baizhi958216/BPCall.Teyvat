import getCurrentUser from "@/app/DAL/user/getCurrentUser";
import { NextResponse } from "next/server";
import updateUser from "@/app/DAL/user/updateUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    if (!currentUser?.id) {
      return new NextResponse("未登录用户...", { status: 401 });
    }

    // 更新用户资料
    const updatedUser = await updateUser({
      ...body,
      currentUserId: currentUser.id,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "修改用户资料失败...");
    return new NextResponse("修改用户资料失败...", { status: 500 });
  }
}
