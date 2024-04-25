import fs from "fs"
import { FunctionComponent } from "react";

type Button = {
    id: string;
    content: string;
}

export function spliceSVG(path: string) { 
    const data = fs.readFileSync(path, "utf-8");
    let array: Button[] = [];

    const matches = data.match(/<g[^>]*>([\s\S]*?)<\/g>/g)

    return (matches);
}