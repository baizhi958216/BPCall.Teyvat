import { NextResponse } from "next/server";
import createUser from "@/app/DAL/user/createUser";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("邮箱, 昵称, 密码均不能为空...", { status: 400 });
    }

    const user = await createUser(body);

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "注册失败...");
    return new NextResponse("注册失败...", { status: 500 });
  }
}
