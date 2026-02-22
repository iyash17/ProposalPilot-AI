# ProposalPilot AI Billing Integration (RevenueCat)

This repository includes a secure RevenueCat subscription integration designed around a single plan: `pro_monthly`.

## What is implemented

- RevenueCat webhook handler as the source of truth for plan state.
- Upgrade endpoint that creates an authenticated checkout URL tied to the Clerk `user_id`.
- Upgrade button component (`Upgrade to Pro`).
- Deterministic plan sync logic:
  - Active subscription => `pro`
  - Cancellation/expiry/non-renewing access loss => `free`

## Environment variables

- `REVENUECAT_WEBHOOK_AUTH` - shared secret set in RevenueCat webhook config.
- `REVENUECAT_PROJECT_ID` - optional, used by helper clients if needed.
- `REVENUECAT_API_KEY` - optional, used by helper clients if needed.
- `REVENUECAT_WEB_CHECKOUT_URL` - hosted checkout URL for `pro_monthly`.
- `APP_URL` - app base URL.

## Security model

- Frontend does **not** write plan state.
- Plan updates are accepted **only** from signed RevenueCat webhooks.
- Webhook is authoritative for both upgrades and downgrades.

