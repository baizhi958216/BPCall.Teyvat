import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
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
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
