import fs from "fs";


export function writeTmpVar(filepath: string, tmp_var_content: string): string {
    let ret_var = "";
    if (!tmp_var_content) {tmp_var_content = "";}

    try {
        fs.writeFileSync(filepath, tmp_var_content);
        ret_var = tmp_var_content;
    } catch(err) {
        console.log(err);
    }

    return ret_var;
}

export function readTmpVar(filepath: string): string {
    let tmp_var = "";

    try {
        tmp_var = fs.readFileSync(filepath, "utf-8");
    } catch (err) {
        console.log(err);
    }

    return tmp_var;
}