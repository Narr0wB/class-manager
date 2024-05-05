"use client"

import React from "react";
import HomeProvider from "./HomeProvider";

type HomeWrapperProps = {
    children: React.ReactNode;
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({children}) => {
    return (
        <HomeProvider>
            {children}
        </HomeProvider>
    );
}

export default HomeWrapper;