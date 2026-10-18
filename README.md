# The Baring

A speculative website for The Baring, the pub at 55 Baring Street, Islington, London N1 3DS.

Demo only: everything runs in the browser on static data. Booking and gift vouchers link out to the
pub's existing SevenRooms and GiftPro pages; the private dining enquiry form shows a confirmation and
sends nothing.

Live: https://alexwilder-dev.github.io/the-baring/

## What's in it

- **Kitchen clock.** Every page opens on whether the kitchen is serving right now, in the pub's own food
  windows (London time). The week strip under "Opening hours" can be dragged to any day and time.
- **Candlelight.** From 18:00 the site dims, the way the room does, and the photos change to evening ones.
  Override in the footer under "Lights".
- **Menus.** À la carte, Sunday, wine & drinks and the feasting menu, transcribed from the weekly PDFs.
  The menus page opens on whichever is on now.
- **Feast planner.** Builds a feasting menu for the first-floor room, with a live per-head and total
  including the 12.5% service charge, then fills in an enquiry.
- The pub, the room, sourcing and recognition; hours, getting here, contact.

## Updating the menus

All content is in `src/data/baring.ts`: menus, drinks, hours, contact details, private dining, press
and photo captions. When a new PDF goes up, update the matching block and its `printed` date and `pdf` link.

## Development

```sh
npm install
npm run dev       # local server
npm run build     # type-check and build to dist/
```

One-off asset scripts (outputs are committed):

```sh
npm run images    # research/photos -> public/photos at 800 and 1600 wide
npm run og        # public/og.jpg, 1200x630, for link previews
npm run icons     # favicon and apple-touch-icon from the logo
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). The site is built
for the path `/the-baring/` (see `vite.config.ts` and the absolute URLs in `index.html`).

## Research

`research/notes.md` has the findings behind every decision: the room, the food, who comes when, what
reviewers say, what was weak on the old site, the sources checked, and the open questions for the owners.
The logo in `src/components/logoPaths.ts` is the pub's own mark, taken as vectors from their 2024 group
booking brochure. Photos are the pub's own, from their current website.

Site by AlexWilder-Dev.
