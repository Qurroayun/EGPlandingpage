import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${nanoid()}-${file.name}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `https://${process.env.R2_BUCKET_NAME!}.${
    process.env.R2_PUBLIC_URL
  }/${fileName}`;
}
