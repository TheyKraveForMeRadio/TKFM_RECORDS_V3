# TKFM MOBILE API MAP

## PURPOSE

Map Android app screens directly to live TKFM backend functions.

This prevents rebuilding logic twice.

Android UI → Existing Netlify Functions

---

# HOME DASHBOARD

## Screen

Dashboard Home

## Functions

- /.netlify/functions/get-user-dashboard
- /.netlify/functions/get-notifications
- /.netlify/functions/check-plan
- /.netlify/functions/check-vip

---

# DISTRIBUTION

## Screen

Client Distribution Dashboard

## Functions

- /.netlify/functions/create-checkout-session
- /.netlify/functions/stripe-success
- /.netlify/functions/stripe-webhook
- /.netlify/functions/distribution-onboarding-email

---

# LABEL STUDIO

## Screen

Mix Lab Dashboard

## Functions

- /.netlify/functions/label-create-request
- /.netlify/functions/label-get-requests
- /.netlify/functions/label-owner-delivery
- /.netlify/functions/label-client-deliverables

---

# WALLET

## Screen

Secure Money Dashboard

## Functions

- /.netlify/functions/request-payout
- /.netlify/functions/get-withdrawals
- /.netlify/functions/get-user-pnl
- /.netlify/functions/stripe-payout-engine

---

# MIXTAPES + CATALOG

## Screen

Owned Content + Storefront

## Functions

- /.netlify/functions/create-plan-checkout
- /.netlify/functions/check-plan
- /.netlify/functions/tkfm-catalog-engine
- /.netlify/functions/pageview-stats

---

# OWNER OPS

## Screen

Master Command Center

## Functions

- /.netlify/functions/admin-engine
- /.netlify/functions/admin-withdrawals-engine
- /.netlify/functions/owner-mix-lab-ops
- /.netlify/functions/stripe-webhook-engine

---

# RULE

Never rebuild backend logic inside Android.

Android = frontend shell over live revenue infrastructure.

