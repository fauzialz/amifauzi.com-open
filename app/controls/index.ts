import { json } from "@remix-run/node";
import { getClinetEnv } from "~/env.server";
import {
  appendMessage,
  getMessage,
  getPersonRemarks,
} from "~/utils/googleSheetsApi";
import type { MessageItemType } from "~/utils/googleSheetsApi";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

export interface LoaderDataType {
  remark: string;
  messages: MessageItemType[];
  ENV: ReturnType<typeof getClinetEnv>;
}

export const indexLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const recipient = url.searchParams.get("to") || "";

  const [recipientRemarks, messages] = await Promise.all([
    getPersonRemarks(recipient),
    getMessage(),
  ]);

  return json<LoaderDataType>({
    remark: recipientRemarks?.remarks || recipient,
    messages,
    ENV: getClinetEnv(),
  });
};

export const indexAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const message = formData.get("message");
  const googleName = formData.get("google_name");

  if (
    typeof name !== "string" ||
    typeof message !== "string" ||
    typeof googleName !== "string"
  ) {
    return { ok: false };
  }

  const success = await appendMessage(name, message, googleName);
  return { ok: success };
};
