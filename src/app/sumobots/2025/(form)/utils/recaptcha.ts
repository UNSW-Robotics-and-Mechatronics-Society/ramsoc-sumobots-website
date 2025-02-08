import axios from "axios";

type CaptchaData = {
    success: true;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
} | {
    success: false;
    "error-codes"?: string[];
};

export const getCaptchaToken = async () => {
    return new Promise<string | null>(resolve => {
        grecaptcha.ready(async () => {
            const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
            if (!SITE_KEY) return;
            const token = await grecaptcha.execute(SITE_KEY, { action: "submit" });
            resolve(token);
        })
    })
}

export const verifyCaptchaToken = async (token: string) => {
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
    if (!SECRET_KEY) throw new Error("No ReCaptcha secret key found");
    const url = new URL("https://www.google.com/recaptcha/api/siteverify");
    url.searchParams.append("secret", SECRET_KEY);
    url.searchParams.append("response", token);
    const res = await axios.post(url.toString());
    if (res.status !== 200) return null;
    const captchaData: CaptchaData = await res.data;
    return captchaData;
}