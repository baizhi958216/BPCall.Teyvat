<p align="center">
    <img src="./public/images/twt.png" height="128">
    <div align="center">提瓦特 BB 机</div>
    <p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="60"/>
    <img src="https://camo.githubusercontent.com/f21f1fa29dfe5e1d0772b0efe2f43eca2f6dc14f2fede8d9cbef4a3a8210c91d/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" height="60">
    <img src="https://camo.githubusercontent.com/35671109c206484f83a277b0b3180af44c5e8fb78c0419adf73f2296d330f3e0/68747470733a2f2f707269736d616c656e732e76657263656c2e6170702f6865616465722f6c6f676f2d6461726b2e737667" alt="prisma_logo" height="60">
    <img src="https://raw.githubusercontent.com/mongodb/mongo/ecf5b575b936f7bbf6d9b3a581a18760e6450ab3/docs/leaf.svg" alt="mongodbLogo" height="60">
    </p>
</p>

# 介绍

## 基于 [Next.js](https://nextjs.org) 的全栈项目, 适用于在线即时聊天

- 使用 [typescript](https://www.typescriptlang.org) 作为开发语言
- 使用 [axios](https://axios-http.com) 进行 AJAX 请求
- 使用 [MongoDB Atlas](https://cloud.mongodb.com) 存储用户账号/聊天记录/会话列表
- 使用 [prisma](https://www.prisma.io) 作为 ORM 框架
- 使用 [bcrypt](https://github.com/kelektiv/node.bcrypt.js) 进行密码加密
- 使用 [cloudinary](https://cloudinary.com) 进行图片传输
- 使用 [pusher](https://pusher.com) 进行实时会话推送
- 使用 [tailwindcss](https://tailwindcss.com) 进行网页响应式设计
- 使用 [vercel](https://vercel.com) 部署项目

# 环境配置

`.env文件`

```
DATABASE_URL=MongoDB Atlas数据库地址
NEXTAUTH_SECRET=NEXTAUTH密匙

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary用户名

NEXT_PUBLIC_PUSHER_APP_KEY=pusher app key
PUSHER_APP_ID = pusher app id
PUSHER_APP_SECRET = pusher app 密匙
PUSHER_APP_CLUSTER = "ap3"

NEXTAUTH_URL = 自定义auth地址"http://localhost:3000/BLL/api/auth"
```

# 运行

- 安装依赖`pnpm i`
- 启动开发环境`pnpm dev`
- 编译上线`pnpm build`
- 启动上线环境`pnpm start`

# 截图

## 电脑端

![b2](./screenshots/b2.png)
![b1](./screenshots/b1.png)
![b3](./screenshots/b3.png)
![b4](./screenshots/b4.png)

## 移动端

![l1](./screenshots/l1.png)
![l2](./screenshots/l2.png)
