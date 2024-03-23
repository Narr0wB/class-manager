import crypto from "crypto"

// Server-side -----------------------------------------------------------

const token_secret: string = process.env.TOKEN_SECRET!
const b64encode = (str: string) => { return Buffer.from(str, "utf-8").toString("base64") }
const b64decode = (str: string) => { return Buffer.from(str, "base64").toString("utf-8") }

export const createJWT = (payload: JSON) => {
    const JWTHeader = {
        alg: "SHA256",
        typ: "JWT"
    };

    const headerB64 = b64encode(JSON.stringify(JWTHeader));

    const payloadB64 = b64encode(JSON.stringify(payload));

    const jwt_head = headerB64 + "." + payloadB64;

    const signature = crypto.createHmac("SHA256", token_secret)
    .update(jwt_head)
    .digest("base64")

    return jwt_head + "." + signature;
}

export const verifyJWT = (jwt_string: string, secret: string) => {

    const strings = jwt_string.split(".");

    const header = JSON.parse(b64decode(strings[0]));
    const hash_algorithm = header.alg;

    const checksum = crypto.createHmac(hash_algorithm, secret)
    .update(strings[0] + "." + strings[1])
    .digest("base64");

    return checksum == strings[2];
}

export const payloadJWT = (jwt_string: string) => {
    const strings = jwt_string.split(".");

    const payload = JSON.parse(b64decode(strings[1]));

    return payload;
}

export function isValidToken(token: string): boolean {

    // Convert JSON to Token
    if (!verifyJWT(token, process.env.TOKEN_SECRET!)) {
        return false;
    }

    const token_payload = payloadJWT(token);

    // Check expiry date
    const currentDate = new Date();

    if (currentDate >= token_payload.exp) {
        return false;
    }

    return true;
}


export function createAccessToken() {

}

export function createRefreshToken() {

}

// Client-side -----------------------------------------------------------

export function validateToken(tkn: string) {
    const req_body = JSON.stringify({ token: tkn })

    fetch("/api/token", { method: "POST", body: req_body })
    .then((response) => response.json())
    .then((data) => {
        return data.valid;
    })
    .catch((error) => {
        console.log("Error occurred: ", error)
    })
}

export function requestAccessToken(refresh_token: string) {

}


