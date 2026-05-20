export { auth as proxy } from "@/auth";

export const config = {
    matcher: [
        "/workspace/:path*",
        "/dashboard/:path*",
    ],
};