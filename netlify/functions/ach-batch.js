import { sendTransfer } from './bank-adapter.js';

export async function handler(event) {

  const { transfers } = JSON.parse(event.body || '{}');

  const results = [];

  for (const t of transfers || []) {

    const res = await sendTransfer({
      provider: t.provider,
      amount: t.amount,
      destination: t.destination
    });

    results.push(res);
  }

  return {
    statusCode:200,
    body:JSON.stringify({ batch_complete:true, results })
  };
}
