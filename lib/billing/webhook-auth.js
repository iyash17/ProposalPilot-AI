import crypto from 'node:crypto';

export function isValidWebhookAuthHeader(authHeader) {
  const expected = process.env.REVENUECAT_WEBHOOK_AUTH;
  if (!expected || !authHeader) return false;

  const incoming = authHeader.replace(/^Bearer\s+/i, '').trim();

  const a = Buffer.from(incoming);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
