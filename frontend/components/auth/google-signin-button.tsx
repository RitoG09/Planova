"use client"

import { signIn } from "next-auth/react"
import { NeoButton } from "../ui/neo-button"

interface GoogleSignInButtonProps {
    children?: React.ReactNode;
    className?: string;
}

export function GoogleSignInButton({ children, className }: GoogleSignInButtonProps) {
    return (
        <NeoButton className={className} onClick={() => signIn("google", {
            redirectTo: "/dashboard",
        })}>
            {children || "Sign in with Google"}
        </NeoButton>
    )
}