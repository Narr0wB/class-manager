"use client"

import HourProvider from "@/components/custom/home/bookings-input/hour-range/hour-provider";
import Home from "./home";

const Page: React.FC = () => {
  return (
    <HourProvider>
      <Home />
    </HourProvider>
  )
}

export default Page;