import { google } from "googleapis";
import type { sheets_v4 } from "googleapis";

export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const getAuthToken = async () => {
  const privateKeyString = (
    process.env.GOOGLE_PRIVATE_KEY || '{ "privateKey": null }'
  ).replace(/\n/g, "\\n");
  const { privateKey } = JSON.parse(privateKeyString);

  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  return auth;
};

let sheets: sheets_v4.Sheets | undefined = undefined;

const getSheets = async () => {
  if (sheets) return sheets;

  const auth = await getAuthToken();
  sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

export const getPersonRemarks = async (name?: string) => {
  if (!name) return undefined;

  try {
    const sheets = await getSheets();
    const range = `Sheet1!A:B`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const dataRaw = response.data.values;
    const data =
      dataRaw?.map((data: string[]) => ({ name: data[0], remarks: data[1] })) ??
      [];
    const regex = new RegExp(`${name}$`, "i");
    const result = data.find((person) => regex.test(person.name));

    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const appendMessage = async (
  name: string,
  message: string,
  googleName: string
) => {
  try {
    const sheets = await getSheets();
    const range = `Sheet2!A:B`;
    const serverTime = new Date();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, message, serverTime, 0, googleName]],
      },
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export interface MessageItemType {
  name: string;
  message: string;
  date: string;
  hide: boolean;
}

export const getMessage = async () => {
  try {
    const sheets = await getSheets();
    const range = `Sheet2!A:D`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const dataRaw = response.data.values;
    const data: MessageItemType[] =
      dataRaw?.map((data: string[]) => ({
        name: data[0],
        message: data[1],
        date: data[2],
        hide: Boolean(Number(data[3])),
      })) ?? [];

    if (data.length > 1) data.shift();

    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (err) {
    console.error(err);
    return [];
  }
};
