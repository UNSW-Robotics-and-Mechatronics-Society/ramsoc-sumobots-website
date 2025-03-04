export const getCaptchaToken = async () => {
  return new Promise<string | null>((resolve) => {
    grecaptcha.enterprise.ready(async () => {
      const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!SITE_KEY) return;
      const token = await grecaptcha.enterprise.execute(SITE_KEY, {
        action: "submit_form",
      });
      resolve(token);
    });
  });
};
