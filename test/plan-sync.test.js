import test from 'node:test';
import assert from 'node:assert/strict';

import { applyRevenueCatEventToUserPlan } from '../lib/billing/plan-sync.js';
import { getUserPlanByClerkId } from '../lib/db/user-plan.js';

test('grant event sets user plan to pro', async () => {
  await applyRevenueCatEventToUserPlan({
    type: 'INITIAL_PURCHASE',
    app_user_id: 'user_123',
    product_id: 'pro_monthly',
  });

  const user = await getUserPlanByClerkId('user_123');
  assert.equal(user.plan, 'pro');
});

test('revoke event sets user plan to free', async () => {
  await applyRevenueCatEventToUserPlan({
    type: 'EXPIRATION',
    app_user_id: 'user_123',
    product_id: 'pro_monthly',
  });

  const user = await getUserPlanByClerkId('user_123');
  assert.equal(user.plan, 'free');
});
