declare namespace NodeJS {
    export interface ProcessEnv {
        GOOGLE_SHEETS_API_URL: string;
        GOOGLE_SHEETS_API_TOKEN: string;
        GOOGLE_SHEETS_SPREADSHEET_ID: string;
    }
}