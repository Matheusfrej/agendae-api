import fs from "fs";
import path from "path";
import { env } from "../env";

export const getParsedBody = (emailType: EmailType) => {
  let html: string;
  if (env.NODE_ENV === "production") {
    html = fs.readFileSync(
      path.join(__dirname, "/email", "/templates/", `${emailType.type}.txt`),
      "utf-8",
    );
  } else {
    html = fs.readFileSync(
      path.join("src/", "/email/", "/templates/", `${emailType.type}.txt`),
      "utf-8",
    );
  }

  Object.entries(emailType.params).forEach(([key, value]) => {
    while (html.includes(`{{${key}}}`)) {
      html = html.replace(`{{${key}}}`, value);
    }
  });

  return html;
};
