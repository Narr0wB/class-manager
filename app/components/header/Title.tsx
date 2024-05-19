"use client"

import { cn } from "@/lib/utils";
import { DM_Sans } from "next/font/google";

type TitleProps = {
} & React.HTMLAttributes<HTMLDivElement>

const font = DM_Sans({ subsets: ["latin"] })

const Title: React.FC<TitleProps> = (props) => {
  const { className, ...others } = props;

  return (
    <div id="title" {...others} className={cn("flex flex-col", className)}>
      <h1 className={cn("text-2xl sm:text-4xl whitespace-nowrap text-primary text-center font-semibold", font.className)}>
        Class manager
      </h1>
    </div>
  )
}

Title.displayName = "Title";

export default Title;