let LABELS = {};

export async function handler(event) {
  const { action, labelId, owner, revenueSplit } = JSON.parse(event.body);

  if (action === "register") {
    LABELS[labelId] = {
      owner,
      revenueSplit: revenueSplit || { artist: 70, label: 30 },
      active: true,
      created_at: Date.now()
    };
  }

  if (action === "disable") {
    if (LABELS[labelId]) LABELS[labelId].active = false;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(LABELS)
  };
}
