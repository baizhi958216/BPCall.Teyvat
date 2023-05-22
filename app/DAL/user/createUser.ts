import prisma from "@/app/BLL/libs/prismadb";
import bcrypt from "bcrypt";

const createUser = async (formBody: {
  email: string;
  name: string;
  password: string;
}) => {
  const { email, name, password } = formBody;

  // 密码加密
  const hashedPassword = await bcrypt.hash(password, 12);

  return await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
};

export default createUser;
