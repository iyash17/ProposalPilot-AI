export const PRO_PRODUCT_ID = 'pro_monthly';

export const PLAN = Object.freeze({
  FREE: 'free',
  PRO: 'pro',
});

/**
 * Returns whether the event should grant Pro access.
 */
export function isProGrantEvent(event) {
  const type = event?.type;
  const productId = event?.product_id;

  if (productId !== PRO_PRODUCT_ID) return false;

  return [
    'INITIAL_PURCHASE',
    'NON_RENEWING_PURCHASE',
    'RENEWAL',
    'UNCANCELLATION',
    'PRODUCT_CHANGE',
  ].includes(type);
}

/**
 * Returns whether the event should revoke Pro access.
 */
export function isProRevokeEvent(event) {
  const type = event?.type;
  const productId = event?.product_id;

  if (productId !== PRO_PRODUCT_ID) return false;

  return ['CANCELLATION', 'EXPIRATION', 'BILLING_ISSUE'].includes(type);
}
