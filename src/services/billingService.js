import apiClient from './apiClient';

export async function createCheckoutSession(priceId) {
  const res = await apiClient.post('/billing/create-checkout-session', { priceId });
  return res.data;
}

export async function getSubscriptionStatus() {
  const res = await apiClient.get('/billing/subscription');
  return res.data;
}

export async function cancelSubscription() {
  const res = await apiClient.delete('/billing/subscription');
  return res.data;
} 