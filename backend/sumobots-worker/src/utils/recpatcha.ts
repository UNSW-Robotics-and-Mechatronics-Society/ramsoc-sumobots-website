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

export const verifyCaptchaToken = async (token: string, env: any) => {
    if (!env.RECAPTCHA_SECRET_KEY) throw new Error("No ReCaptcha secret key found");
    console.log(env)
    const url = new URL(
      "https://recaptchaenterprise.googleapis.com/v1/projects/dark-torch-449612-j4/assessments",
    );
    url.searchParams.append("key", env.RECAPTCHA_SECRET_KEY);
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: {
          token: token,
          expectedAction: "submit_form",
          siteKey: env.RECAPTCHA_SITE_KEY,
        },
      }),
    });
    if (res.status !== 200) return null;
    const captchaData: CaptchaData = await res.json();
    return captchaData;
  };