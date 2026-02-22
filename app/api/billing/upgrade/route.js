import { PRO_PRODUCT_ID } from '../../../../lib/billing/plans.js';

function getClerkUserId(request) {
  // Use your Clerk server helper in production (e.g. auth().userId).
  return request.headers.get('x-clerk-user-id');
}

export async function POST(request) {
  const clerkUserId = getClerkUserId(request);
  if (!clerkUserId) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const checkoutBase = process.env.REVENUECAT_WEB_CHECKOUT_URL;
  if (!checkoutBase) {
    return Response.json({ error: 'missing_checkout_url' }, { status: 500 });
  }

  const url = new URL(checkoutBase);
  url.searchParams.set('app_user_id', clerkUserId);
  url.searchParams.set('product_id', PRO_PRODUCT_ID);

  return Response.json({ checkoutUrl: url.toString() });
}
