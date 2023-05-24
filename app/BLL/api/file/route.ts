import { NextResponse } from "next/server";
import { writeFile } from "node:fs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const data = new Uint8Array(Buffer.from(await file.arrayBuffer()));
  // 10 位随机数作为文件名
  const fileName = Math.floor(
    (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 9)
  );
  writeFile("public/media/" + fileName + ".ogg", data, (err) => {
    console.log(err);
  });
  // 返回文件名
  return NextResponse.json({
    filename: fileName + ".ogg",
  });
}
