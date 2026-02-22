import { PLAN, isProGrantEvent, isProRevokeEvent } from './plans.js';
import { setUserPlanByClerkId } from '../db/user-plan.js';

/**
 * RevenueCat webhook is source of truth.
 * Clerk user_id is stored as RevenueCat app_user_id.
 */
export async function applyRevenueCatEventToUserPlan(event) {
  const clerkUserId = event?.app_user_id;

  if (!clerkUserId) {
    return { updated: false, reason: 'missing_app_user_id' };
  }

  if (isProGrantEvent(event)) {
    await setUserPlanByClerkId(clerkUserId, PLAN.PRO);
    return { updated: true, plan: PLAN.PRO };
  }

  if (isProRevokeEvent(event)) {
    await setUserPlanByClerkId(clerkUserId, PLAN.FREE);
    return { updated: true, plan: PLAN.FREE };
  }

  return { updated: false, reason: 'event_ignored' };
}
