/**
 * Replace this implementation with your real persistence layer.
 * This adapter intentionally keeps AI/business logic untouched and only mutates billing plan state.
 */
const inMemoryUsers = new Map();

export async function setUserPlanByClerkId(clerkUserId, plan) {
  if (!clerkUserId) throw new Error('Missing clerk user id');
  inMemoryUsers.set(clerkUserId, { clerkUserId, plan, updatedAt: new Date().toISOString() });
  return inMemoryUsers.get(clerkUserId);
}

export async function getUserPlanByClerkId(clerkUserId) {
  return inMemoryUsers.get(clerkUserId) ?? { clerkUserId, plan: 'free' };
}
