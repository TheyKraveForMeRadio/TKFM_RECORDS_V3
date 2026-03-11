
export async function handler() {

  const checklist = {
    auditedFinancials: false,
    cleanCapTable: true,
    recurringRevenueAbove1M: true,
    churnBelow5Percent: true,
    dataRoomPrepared: false
  };

  return {
    statusCode:200,
    body:JSON.stringify(checklist)
  };
}
