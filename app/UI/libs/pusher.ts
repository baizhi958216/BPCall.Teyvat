import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    channelAuthorization: {
      endpoint: "/BLL/api/auth",
      transport: "ajax",
    },
    cluster: "ap3",
  }
);

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "ap3",
  useTLS: true,
});
