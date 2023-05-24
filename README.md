<p align="center">
    <img src="./public/images/twt.png" height="128">
<h1 align="center">提瓦特 BB 机</h1>
</p>
<div style="display:flex;align-items:center;justify-content:center">
    <div>
        <img src="https://camo.githubusercontent.com/f21f1fa29dfe5e1d0772b0efe2f43eca2f6dc14f2fede8d9cbef4a3a8210c91d/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67"
            data-canonical-src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png"
            style="visibility:visible;max-width:100%;" height="60">
    </div>
    +
    <div>
    <a><svg width="60" height="60" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-sm mr-0 w-10 h-10 text-link dark:text-link-dark flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg></a>
    </div>
    +
    <div>
        <img src="https://prismalens.vercel.app/header/logo-dark.svg" alt="prisma_logo" width="90" height="60">
    </div>
    +
    <div>
        <img alt="Tailwind CSS"
            src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="250"
            height="90">
    </div>
</div>

# 介绍

## 基于 [Next.js](https://nextjs.org) 的全栈项目, 适用于在线即时聊天

- 使用 [axios](https://axios-http.com) 进行 AJAX 请求
- 数据库使用 [MongoDB Atlas](https://cloud.mongodb.com) 存储用户账号/聊天记录/会话列表
- 后端使用 [prisma](https://www.prisma.io) 作为 ORM 框架
- 后端使用 [bcrypt](https://github.com/kelektiv/node.bcrypt.js) 进行密码加密
- 后端使用 [cloudinary](https://cloudinary.com) 进行图片传输
- 后端使用 [pusher](https://pusher.com) 进行实时会话推送
- 前端使用 [React](https://react.dev)
- 前端使用 [Tailwindcss](https://tailwindcss.com)

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
