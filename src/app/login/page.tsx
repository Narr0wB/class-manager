import type { Metadata } from "next";
import '@/app/login/page.module.css'

export default function Login() {
    return (
        <main className="flex flex-col min-h-screen  items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-600">
                <div><p>Uno</p></div>
                <div><p>Due</p></div>
            </div>
        </main>
    );
}