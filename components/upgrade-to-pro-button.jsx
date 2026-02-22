'use client';

import { useState } from 'react';

export function UpgradeToProButton() {
  const [loading, setLoading] = useState(false);

  async function onUpgrade() {
    setLoading(true);
    try {
      const response = await fetch('/api/billing/upgrade', { method: 'POST' });
      if (!response.ok) throw new Error('Unable to start checkout');

      const { checkoutUrl } = await response.json();
      window.location.assign(checkoutUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={onUpgrade} disabled={loading}>
      {loading ? 'Redirecting...' : 'Upgrade to Pro'}
    </button>
  );
}
