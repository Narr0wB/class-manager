"use client"

import { signIn } from "next-auth/react"
import GoogleButton from "react-google-button"
    // import { Button } from "react-day-picker";

export default function Login() {
    return (
        <main>
            <h1>
                <GoogleButton onClick={() => {signIn('google')}}></GoogleButton>
            </h1>
        </main>
    );
}