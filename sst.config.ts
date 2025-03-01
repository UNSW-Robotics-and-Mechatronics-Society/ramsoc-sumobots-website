// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "ramsoc-sumobots-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: { cloudflare: "5.49.1" },
    };
  },
  async run() {
    const secrets = {
      contentfulAccessKey: new sst.Secret("CONTENTFUL_SPACE_ID"),
      contentfulAccesToken: new sst.Secret("CONTENTFUL_ACCESS_TOKEN"),
      googlesheetsApiUrl: new sst.Secret("GOOGLE_SHEETS_API_URL"),
      googlesheetsApiToken: new sst.Secret("GOOGLE_SHEETS_API_TOKEN"),
      googlesheetsSpreadsheetId: new sst.Secret("GOOGLE_SHEETS_SPREADSHEET_ID"),
      recaptchaSecretKey: new sst.Secret("RECAPTCHA_SECRET_KEY"),
      recaptchaSiteKey: new sst.Secret("NEXT_PUBLIC_RECAPTCHA_SITE_KEY"),
    };
    const secretList = Object.values(secrets);
    // Determine if the current stage is production
    const isProd = $app.stage === "production";
    // Set the domain based on the stage (production or development by default)
    const domain = isProd
      ? "sumobots.ramsocunsw.org"
      : "sumobots-dev.ramsocunsw.org";
    // Set up redirects for the domain
    const redirects = [`www.${domain}`];
    new sst.aws.Nextjs("ramsocSumobotsWeb", {
      link: [...secretList],
      domain: {
        name: domain,
        redirects: redirects,
        dns: sst.cloudflare.dns({
          zone: "ca644a64f0e7ca59833213c802d08bff",
          override: true,
        }),
      },
    });
  },
});
