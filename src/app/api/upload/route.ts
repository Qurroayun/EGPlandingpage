import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `${uuidv4()}-${file.name}`;

    const client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    });

    await client.send(command);

    const publicUrl = `https://${process.env.R2_PUBLIC_DOMAIN}/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error("Upload failed", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
