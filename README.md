# Julie & John’s wedding website

This is a local bilingual wedding site built with React, TypeScript, and Vite. The colors, typography, and Simplified Chinese copy are provisional. Event details, photos, and guest workflows come in later milestones.

## Preview in VS Code

Open this folder in VS Code. Use Node 22.12+ on the Node 22 line (see `.node-version`). In VS Code’s integrated terminal, run:

```sh
npm ci
npm run dev
```

Open the **Local** URL Vite prints. Edit the copy in `src/locales/` or the design in `src/styles.css` and save to see changes live. Switch languages, reload, and confirm your choice is remembered. Use the browser’s responsive view to check small screens, and Tab to check the language buttons.

```sh
npm run build
npm run preview
```

The production build goes in `dist/`. The preview command serves that build locally. Commit `package-lock.json` with the project.

## Animation foundation

- GSAP fades in the homepage cover photo in `src/components/InvitationCard.tsx`. Use inline SVG elements when a future illustration needs individual paths or petals animated. Add ScrollTrigger when a section needs scroll-linked motion.
- Motion for React animates route entrances in `src/App.tsx`. The persistent navigation uses React Router, and the reduced-motion preference applies to both animation systems.
- Run `npm run typecheck` for a standalone type check. The production build also runs it.

## Milestones

1. Review the homepage, choose the Chinese script, and agree on visual direction with Julie.
2. Finalize the shared-password flow, session lifetime, and edge routing. Verify unauthorized requests to pages, assets, and APIs across all deployment URLs.
3. Finalize the RSVP deadline and timezone, household credential format, and Sheet schema. Test roster validation, updates, and simultaneous submissions with dummy households.
4. Finalize bilingual email templates and recipient rules. Test with internal addresses before enabling guest mail.
5. Publish the guest site after the privacy checks pass. Use the included Pages domain to avoid a domain purchase.

See [AGENTS.md](AGENTS.md) for the architecture and implementation boundaries.

## Deploy through private GitHub and Cloudflare Pages

1. Confirm the existing GitHub repository is **private**. From this clone, review the changes, stage the starter files, and push the commit to the configured remote.

   ```sh
   git status --short
   git add .gitignore .node-version AGENTS.md README.md index.html package.json package-lock.json src tsconfig.json vite.config.ts
   git diff --cached
   git commit -m "Add bilingual wedding website starter"
   git push origin main
   ```

2. In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository**. Connect GitHub and select the private repository.
3. Select the React (Vite) preset and use production branch `main`, build command `npm run build`, and build output directory `dist`. Leave the root at the repository root and use Node 22 as declared in `.node-version`.
4. Once the privacy checks pass, deploy and verify the generated `pages.dev` URL. Cloudflare rebuilds on production pushes and can deploy previews for other branches. Restrict or disable preview access before adding private content.

A Pages deployment of this starter would be publicly reachable. The private repository protects source access, and the robots tag only requests search engine exclusion. Keep this milestone local until server-side access is ready.

[Cloudflare’s React deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) · [Vite’s Node requirements](https://vite.dev/guide/)
