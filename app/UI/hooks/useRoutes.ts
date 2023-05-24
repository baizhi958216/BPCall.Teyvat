import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/UI/conversations",
        icon: HiChat,
        active: pathname === "/UI/conversations" || !!conversationId,
      },
      {
        label: "User",
        href: "/UI/users",
        icon: HiUsers,
        active: pathname === "/UI/users",
      },
      {
        label: "Logout",
        href: "/UI",
        onClick: () => signOut({ callbackUrl: "/UI" }),
        icon: HiArrowLeftOnRectangle,
      },
      {
        label: "Github",
        href: "https://github.com/baizhi958216/BPCall.Teyvat/",
        icon: AiFillGithub,
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
