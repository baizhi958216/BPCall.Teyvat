import bcrypt from "bcrypt";
import prisma from "@/app/BLL/libs/prismadb";

const authorizeUser = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  // 未输入邮箱/密码
  if (!credentials?.email || !credentials?.password) {
    throw new Error("请检查账号密码是否正确！");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  // 账号不存在或密码不存在
  if (!user || !user?.hashedPassword) {
    throw new Error("请检查账号密码是否正确！");
  }

  const isCorrectPassword = await bcrypt.compare(
    credentials.password,
    user.hashedPassword
  );

  // 密码错误
  if (!isCorrectPassword) {
    throw new Error("请检查账号密码是否正确！");
  }

  return user;
};

export default authorizeUser;
