import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';
import { supabase } from './supabase.js';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function handler() {

  const tables = [
    'artist_balances',
    'payout_batches',
    'payout_line_items',
    'tax_escrow',
    'treasury_summary'
  ];

  const snapshot = {};

  for (const table of tables) {
    const { data } = await supabase.from(table).select('*');
    snapshot[table] = data || [];
  }

  const body = JSON.stringify(snapshot);

  const hash = crypto.createHash('sha256')
    .update(body)
    .digest('hex');

  await s3.send(new PutObjectCommand({
    Bucket: process.env.SNAPSHOT_BUCKET,
    Key: `snapshots/${Date.now()}.json`,
    Body: body,
    ServerSideEncryption: "AES256"
  }));

  return {
    statusCode:200,
    body:JSON.stringify({ snapshot_uploaded:true, hash })
  };
}
