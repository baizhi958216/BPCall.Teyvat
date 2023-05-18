import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/UI",
  },
});

export const config = {
  matcher: ["/UI/users/:path*", "/UI/conversations/:path*"],
};
