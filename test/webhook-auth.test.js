import test from 'node:test';
import assert from 'node:assert/strict';

import { isValidWebhookAuthHeader } from '../lib/billing/webhook-auth.js';

test('webhook auth validation', () => {
  process.env.REVENUECAT_WEBHOOK_AUTH = 'top_secret';

  assert.equal(isValidWebhookAuthHeader('Bearer top_secret'), true);
  assert.equal(isValidWebhookAuthHeader('Bearer nope'), false);
  assert.equal(isValidWebhookAuthHeader(undefined), false);
});
