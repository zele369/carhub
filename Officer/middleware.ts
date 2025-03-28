export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!api/uploadthing|api/booking|auth/signIn).*)", // Allow /api/uploadthing, /api/booking, and /auth/signin to bypass auth
  ],
};