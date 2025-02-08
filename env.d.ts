declare namespace NodeJS {
    export interface ProcessEnv {
        GOOGLE_SHEETS_API_URL: string;
        GOOGLE_SHEETS_API_TOKEN: string;
        GOOGLE_SHEETS_SPREADSHEET_ID: string;
        RECAPTCHA_SECRET_KEY: string;
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
    }
}