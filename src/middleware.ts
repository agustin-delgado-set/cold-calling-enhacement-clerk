import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    afterAuth(auth, req, evt) {
        if (auth.userId && req.nextUrl.pathname !== "/auth/success-login") {
            const orgSelection = new URL("/auth/success-login", req.url);
            return NextResponse.redirect(orgSelection);
        }
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
