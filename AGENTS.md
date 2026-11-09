# Julie & John’s wedding website

Build incrementally with Julie and John. Keep the monthly budget at $0 using a private GitHub repository, Cloudflare Pages, private Google Sheets, and Google Apps Script with the wedding Gmail account. Verify free-tier quotas before enabling live workflows.

## Architecture

- `src/` contains React, TypeScript, and Vite, reusable UI in `components/`, and English and Chinese resources in `locales/` using react-i18next. Keep guest-facing copy in translation files and persist only the language preference in browser storage.
- Future `functions/` holds Cloudflare Pages Functions for the shared password gate and a separate household RSVP API. Serve protected content and assets only after server-side session validation. Keep the login UI public and self-contained. Include production, previews, and alternate deployment URLs in privacy testing.
- Future `apps-script/` holds Google Sheets access and Gmail workflows in separate modules. The browser talks to the same-origin RSVP API. The edge authenticates requests to Apps Script using server-only credentials. Finalize the trust model before implementing the integration.
- Use GSAP for cinematic timelines, SVG choreography, and future ScrollTrigger sequences. Scope selectors to the component and revert timelines on cleanup. Use Motion for React for route entrances and future UI interactions. Honor reduced-motion preferences and avoid animating the same element with both libraries.
- React Router handles client-side navigation. Keep page URLs compatible with Cloudflare Pages' SPA fallback.
- Keep React Three Fiber and Rive optional until a specific 3D or interactive illustration feature needs one.

## Guest access and RSVPs

- About 80 people are invited. Everyone is invited to both the wedding and reception.
- Use one shared wedding password and an attractive custom entrance screen. Validate credentials server-side and remember sessions securely with expiring, Secure, HttpOnly, SameSite cookies. Plan throttling and session invalidation.
- A household-specific invitation link or code separately authorizes access to that household. Avoid logging invitation secrets. Keep Sheets private and expose only the authorized household’s minimum necessary data.
- Each household has a predefined roster. Each listed person can accept or decline. Reject extra guests and automatic plus-ones. Allow changes through the deadline, enforced on the server in the agreed timezone. Plan for duplicate requests and simultaneous edits.

## Language, email and design

- Support English and Chinese throughout pages, RSVP forms, and important communications. Confirm Simplified versus Traditional Chinese later. The starter uses provisional Simplified Chinese. Update the document language when the visitor switches.
- Use the wedding Gmail account for announcements, RSVP confirmations, and reminders. Track responded and pending households and support targeted recipient lists. Plan send quotas and retry behavior before enabling mail.
- Aim for an elegant, romantic, modern experience with mobile layouts, keyboard navigation, visible focus, and reduced-motion support. Explore animated invitations, scroll reveals, timelines, and galleries with Julie before settling the visual direction.

## Current scope and privacy

- This milestone is the local bilingual site and its animation foundation. Wait until requirements are finalized before implementing the password gate, RSVP submissions, Sheets integration, or email sending.
- Keep passwords, API credentials, invitation tokens, and guest records out of frontend source, frontend environment variables, public assets, Git history, and logs. Use server-side secret stores for credentials and the private Sheet for guest records.
- Keep real wedding and guest content local until the gate is implemented and verified. A private GitHub repository does not make the deployed site private.
