import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  const fromEmail = process.env.SES_FROM_EMAIL!;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "[Nodi Cloud] 비밀번호 재설정" },
      Body: {
        Html: {
          Data: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>비밀번호 재설정</h2>
              <p>아래 버튼을 클릭하여 비밀번호를 재설정하세요.</p>
              <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00FFDD; color: black; text-decoration: none; border-radius: 8px; font-weight: 500;">
                비밀번호 재설정
              </a>
              <p style="margin-top: 24px; color: #666;">이 링크는 1시간 후 만료됩니다.</p>
              <p style="color: #666;">본인이 요청하지 않았다면 이 이메일을 무시하세요.</p>
            </div>
          `,
        },
        Text: {
          Data: `비밀번호 재설정\n\n아래 링크를 클릭하여 비밀번호를 재설정하세요:\n${resetUrl}\n\n이 링크는 1시간 후 만료됩니다.`,
        },
      },
    },
  });

  await ses.send(command);
}
