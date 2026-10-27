# ROBOFEST — Build Beyond Ordinary

A responsive landing page by **Ayush Chauhan**, built for the ROBOTiX Club, NIT Raipur, Web & App Development recruitment challenge.

- **Planned GitHub Pages URL:** [ROBOFEST](https://ayushchauhan2006.github.io/ROBOTiX_landing_page/) — not live yet; deploy it yourself using the steps below.
- **Source repository:** [ayushchauhan2006/ROBOTiX_landing_page](https://github.com/ayushchauhan2006/ROBOTiX_landing_page)
- **Project folder:** [`robofest/`](./robofest/)
- **Official content reference:** [ROBOFEST, ROBOTiX Club](https://robotix.nitrr.ac.in/robofest)

This is a student recruitment concept. The referenced ROBOFEST edition took place on **22–23 March 2026** and has concluded. The registration section links to the official club website for updates; this project does not collect registrations or personal information.

## Theme

**Build Beyond Ordinary** combines a dark futuristic setting with an approachable robot companion. Charcoal backgrounds, mint accents, subtle grid lines, orbit rings, and original SVG illustrations suggest robotics and experimentation. Large Space Grotesk headings establish a clear visual hierarchy, while DM Sans keeps longer text readable. Purple and orange event accents distinguish the challenges without changing the overall theme.

Motion serves interaction: Bolt follows the cursor with its eyes and waves when clicked or tapped; event cards, buttons, and navigation respond to user input. Reduced-motion preferences are supported.

## Features

- Hero section with an original SVG robot, headline, and event discovery CTA.
- About section introducing ROBOFEST and ROBOTiX Club, NIT Raipur.
- Three featured competitions: Robowar, Roborace, and Robothon.
- Event detail dialogs with links to the official event pages.
- Registration and updates CTA with an explicit notice that the 2026 edition has concluded.
- FAQ accordion, mobile navigation, active section indication, and branded footer.
- Responsive layouts, keyboard-operable controls, visible focus styles, and a skip link.

## Run locally

Install Node.js and npm, then run these commands from the repository root:

```bash
cd robofest
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal. To build and preview the production version, run these commands from `robofest/`:

```bash
npm run build
npm run preview
```

Vite writes the production files to `robofest/dist/`.

## Technology and design choices

| Tool | Purpose |
| --- | --- |
| HTML and JSX | Semantic page structure and React component markup |
| React 19 | Reusable components and state for menus, FAQs, dialogs, and the robot greeting |
| JavaScript | Pointer tracking, animation scheduling, event handling, and section observation |
| CSS | Custom layout, responsive breakpoints, colors, transitions, and robot animation |
| Vite | Local development server and production bundling |
| SVG | Original robot, competition illustrations, and favicon |
| Lucide React | Interface icons, including arrows, location, calendar, and the stylized robot brand symbol |
| Google Fonts | Space Grotesk and DM Sans, with system font fallbacks |

The design and styles are custom to this project. It does not use an unchanged website template, a prebuilt page layout, a UI component kit, or a backend. The ROBOTiX wordmark treatment is a project interpretation, not an official logo asset. The robot and event artwork are authored as SVG code; no externally generated image or video assets are used.

## Understanding the code

Start with the [implementation walkthrough](./robofest/README.md). It explains the entry point, page components, state, cursor-following eyes, responsive styles, and places to edit the content.

## Deploy to GitHub Pages yourself

The repository includes a manual deployment workflow at [`.github/workflows/pages.yml`](./.github/workflows/pages.yml). Pushing changes does **not** automatically deploy the website.

1. Commit and push the project files yourself to the repository's default `main` branch.
2. On GitHub, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Open **Actions → Deploy to GitHub Pages → Run workflow**, choose `main`, and run it.
4. Wait for the workflow to finish successfully, then open [your GitHub Pages site](https://ayushchauhan2006.github.io/ROBOTiX_landing_page/).

The workflow installs dependencies with `npm ci`, runs `npm run build:pages` inside `robofest/`, and deploys `robofest/dist/`. The GitHub Pages build sets Vite's base path to `/ROBOTiX_landing_page/` so assets load correctly at the repository URL. If you rename the repository, update that base path in `robofest/vite.config.js`.

For later updates, push your changes and run the workflow manually again. No API keys, environment variables, database, or server process are required. See [Vite's GitHub Pages deployment guide](https://vite.dev/guide/static-deploy.html#github-pages) for the setup reference.

## Submission text

### Chosen theme

> “Build Beyond Ordinary” is a dark futuristic theme that presents robotics as both technically exciting and welcoming. Mint highlights, a charcoal background, geometric details, and a friendly interactive robot create a consistent visual identity. Restrained animation and clear typography keep the content easy to explore on desktop and mobile.

### Project description

> I created a responsive ROBOFEST landing page for the ROBOTiX Club recruitment challenge at NIT Raipur. It includes a hero, an About section, three robotics competitions with detail dialogs, a registration updates CTA, FAQs, and a branded footer. Its main interaction is Bolt, an original SVG robot whose eyes follow the cursor and which waves on click or tap. The project uses React 19, HTML/JSX, custom CSS, JavaScript, and Vite, with Lucide icons and Google Fonts. Official event information is credited, and the page clearly identifies the March 2026 edition as concluded.

### AI and third-party disclosure

> Built with substantial assistance from OpenAI Codex for the visual design, React components, CSS, JavaScript interactions, original SVG artwork, and project documentation. I selected the technology stack and visual direction and requested the cursor-following robot. This is a custom implementation, not an unchanged template. Third-party tools and assets are React, Vite, Lucide React icons, and the Space Grotesk and DM Sans fonts from Google Fonts. Event information comes from the official ROBOTiX/ROBOFEST pages. No backend or external AI-generated image/video assets are used.

Add the deployed live website URL to the submission alongside the repository link. Before submitting, review the walkthrough and practise explaining how the page and robot interactions work.
