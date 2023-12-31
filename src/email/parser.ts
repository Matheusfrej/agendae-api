import fs from "fs";
import path from "path";

export const getParsedBody = (emailType: EmailType) => {
  let html = fs.readFileSync(
    path.join(__dirname, `\\templates\\${emailType.type}.html`),
    "utf-8",
  );

  Object.entries(emailType.params).forEach(([key, value]) => {
    while (html.includes(`{{${key}}}`)) {
      html = html.replace(`{{${key}}}`, value);
    }
  });

  return html;
};
