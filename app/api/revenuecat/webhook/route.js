import { isValidWebhookAuthHeader } from '../../../../lib/billing/webhook-auth.js';
import { applyRevenueCatEventToUserPlan } from '../../../../lib/billing/plan-sync.js';

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!isValidWebhookAuthHeader(authHeader)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const event = payload?.event;

  const result = await applyRevenueCatEventToUserPlan(event);
  return Response.json({ ok: true, result }, { status: 200 });
}
