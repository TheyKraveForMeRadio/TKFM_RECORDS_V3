import { supabase } from './supabase.js';

async function sendSlackAlert(message) {
  if (!process.env.SLACK_WEBHOOK_URL) return;

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message })
  });
}

export async function handler() {

  try {

    const { data: entities, error } = await supabase
      .from('entity_risk_scores')
      .select('*');

    if (error) {
      return { statusCode: 500, body: error.message };
    }

    for (const entity of entities) {

      const entity_id = entity.entity_id;

      /*
      -------------------------------------------------
      ADAPTIVE WEIGHT LOGIC
      Each entity learns its own risk multiplier
      -------------------------------------------------
      */

      let baseRisk = entity.risk_score || 0;
      let multiplier = entity.risk_multiplier || 1;

      let riskDelta = 0;

      if (entity.failed_webhooks > 10) riskDelta += 10;
      if (entity.chargeback_count > 3) riskDelta += 20;
      if (entity.large_payout_spike === true) riskDelta += 15;

      let risk_score = Math.min(
        100,
        Math.max(0, baseRisk + (riskDelta * multiplier))
      );

      /*
      -------------------------------------------------
      ADAPTIVE MULTIPLIER ADJUSTMENT
      If repeated risk spikes → increase sensitivity
      -------------------------------------------------
      */

      if (risk_score > 70) {
        multiplier = Math.min(3, multiplier + 0.05);
      } else {
        multiplier = Math.max(1, multiplier - 0.02);
      }

      /*
      -------------------------------------------------
      UPDATE LIVE SCORE
      -------------------------------------------------
      */

      await supabase
        .from('entity_risk_scores')
        .update({
          risk_score,
          risk_multiplier: multiplier,
          last_evaluated_at: new Date().toISOString()
        })
        .eq('entity_id', entity_id);

      /*
      -------------------------------------------------
      SNAPSHOT LOGGING
      -------------------------------------------------
      */

      await supabase
        .from('risk_score_history')
        .insert({
          entity_id,
          risk_score,
          created_at: new Date().toISOString()
        });

      /*
      -------------------------------------------------
      AUTOMATIC FREEZE TRIGGER
      -------------------------------------------------
      */

      if (risk_score >= 85 && !entity.payout_frozen) {

        await supabase
          .from('entity_risk_scores')
          .update({
            payout_frozen: true,
            freeze_triggered_at: new Date().toISOString()
          })
          .eq('entity_id', entity_id);

        await supabase
          .from('security_events')
          .insert({
            event_type: 'AUTO_PAYOUT_FREEZE',
            severity: 'CRITICAL',
            actor: entity_id,
            metadata: { risk_score }
          });

        await sendSlackAlert(
          `🚨 AUTO FREEZE TRIGGERED\nEntity: ${entity_id}\nRisk Score: ${risk_score}`
        );
      }

      /*
      -------------------------------------------------
      HIGH RISK ALERT (Slack only)
      -------------------------------------------------
      */

      if (risk_score >= 85) {
        await sendSlackAlert(
          `⚠️ High Risk Detected\nEntity: ${entity_id}\nRisk Score: ${risk_score}`
        );
      }

    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };

  }
}
