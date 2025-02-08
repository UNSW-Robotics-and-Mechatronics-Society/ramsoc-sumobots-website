import axios from "axios";

type CaptchaData = {
    name: string;
    event: {
        token: string;
        siteKey: string;
        userAgent: string;
        userIpAddress: string;
        expectedAction: string;
        hashedAccountId: string;
        express: boolean;
        requestedUri: string;
        wafTokenAssessment: boolean;
        ja3: string;
        ja4: string;
        headers: [];
        firewallPolicyEvaluation: boolean;
        fraudPrevention: string;
    };
    riskAnalysis: {
        score: number;
        reasons: string[];
        extendedVerdictReasons: string[];
        challenge: string;
    };
    tokenProperties: {
        valid: boolean;
        invalidReason: string;
        hostname: string;
        androidPackageName: string;
        iosBundleId: string;
        action: string;
        createTime: string;
    };
    accountDefenderAssessment: {
        labels: string[];
    };
};

export const getCaptchaToken = async () => {
    return new Promise<string | null>(resolve => {
        grecaptcha.enterprise.ready(async () => {
            const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
            if (!SITE_KEY) return;
            const token = await grecaptcha.enterprise.execute(SITE_KEY, { action: "submit_form" });
            resolve(token);
        })
    })
}

export const verifyCaptchaToken = async (token: string) => {
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
    if (!SECRET_KEY) throw new Error("No ReCaptcha secret key found");
    const url = new URL("https://recaptchaenterprise.googleapis.com/v1/projects/dark-torch-449612-j4/assessments");
    url.searchParams.append("key", SECRET_KEY);
    const res = await axios.post(url.toString(), {
        event: {
            token: token,
            expectedAction: "submit_form",
            siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        }
    });
    if (res.status !== 200) return null;
    const captchaData: CaptchaData = await res.data;
    return captchaData;
}