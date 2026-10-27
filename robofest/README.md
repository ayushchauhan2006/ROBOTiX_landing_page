# ROBOFEST implementation walkthrough

The [repository README](../README.md) contains the theme, project description, AI disclosure, and deployment settings. This guide explains how the implementation works.

## Start the project

From the repository root:

```bash
cd robofest
npm install
npm run dev
```

From this `robofest/` directory, `npm run build` creates `dist/`, and `npm run preview` serves that production build locally.

## File map

```text
robofest/
├── index.html                 HTML document, metadata, fonts, and React root
├── package.json               Dependencies and npm commands
├── public/favicon.svg         Site icon
└── src/
    ├── main.jsx               Mounts React and imports the page stylesheet
    ├── App.jsx                Page sections, event content, FAQ, navigation, dialogs
    ├── styles.css             Theme, layout, responsive rules, and focus styles
    └── components/
        ├── Robot.jsx          Original SVG robot and eye-tracking logic
        ├── Robot.css          Robot floating, blinking, and greeting animation
        └── EventArt.jsx       Original SVG illustrations for the event cards
```

## From HTML to the page

`index.html` supplies a `<div id="root">`. In `src/main.jsx`, React's `createRoot` mounts the `App` component inside that element. `App.jsx` returns JSX: HTML-like markup that can contain JavaScript expressions and other React components.

`React.StrictMode` helps expose development mistakes. In development, React can run an effect's setup and cleanup an extra time. Cleanup functions are therefore important for event listeners and animation frames.

## Page content and reusable components

`App.jsx` stores the event information in an `events` array. Calling `events.map(...)` turns each object into an event card. This keeps the same markup for all three cards while allowing the title, description, artwork, accent, and external link to change. Each card has a stable `key` using its event ID so React can track it.

The FAQs use the same approach: an array of question/answer pairs becomes a list of accordion items. `Brand` renders the club name in the header and footer. `Robot` and `EventArt` keep larger illustrations separate from the page layout.

## State and effects

`useState` stores values that change the visible interface:

| State | What it controls |
| --- | --- |
| `menuOpen` | Whether mobile navigation is visible |
| `activeSection` | Which navigation link is highlighted |
| `selectedEvent` | Which event appears in the detail dialog, or `null` when closed |
| `openFaq` | The index of the expanded FAQ, or `null` when all are closed |
| `isWaving` in `Robot` | Whether the robot greeting animation is active |

Click handlers update this state. React then updates the relevant interface. `useEffect` connects React to browser features such as keyboard events, `IntersectionObserver`, and pointer tracking, and removes those connections when a component no longer needs them.

The section observer watches the main sections and updates `activeSection` as the user scrolls. The mobile menu can close with Escape. Event details use the browser's native `<dialog>` element and `showModal()`, which supplies modal behavior and keyboard focus handling. The dialog supports a close button, Escape, and clicking its backdrop; the effect temporarily locks background scrolling.

## How the robot eyes follow the cursor

The robot is an SVG made from paths, circles, rectangles, and gradients. It is vector artwork, so it stays sharp as its display size changes. The eyes are grouped inside a `<g>` element referenced by `gazeRef`.

1. An effect adds a passive `pointermove` listener to the window.
2. `getBoundingClientRect()` finds the robot's position and displayed size.
3. The pointer's distance from an approximate face center is converted into an SVG x/y movement target.
4. `Math.min` and `Math.max` limit that target to **−12 to 12** horizontally and **−8 to 8** vertically. The eyes therefore remain within the face.
5. `requestAnimationFrame` moves the current gaze 18% of the remaining distance toward the target on each frame. It updates the eye group's SVG `transform` attribute.
6. The frame loop stops when the eyes are close enough to their target. It resumes when the pointer gives them a new target.

The coordinates live in variables inside the effect, and the SVG element is accessed through `useRef`. Moving the pointer does not cause a full React render on every frame. When the pointer leaves the document or the window loses focus, the target returns to the center. Cleanup cancels pending frames and removes listeners.

Touch movement is ignored so normal page scrolling stays comfortable. The robot is a real button: clicking, tapping, or pressing Enter activates its greeting. A timer clears the waving state after the greeting, and a live region announces it to assistive technology.

With `prefers-reduced-motion: reduce`, the gaze uses direct movement rather than easing, and CSS suppresses the ambient animations and transitions.

## Responsive styling and accessibility

`styles.css` defines the shared theme and layout. CSS variables such as `--mint` make theme colors reusable. Grid and flex layouts arrange desktop content; media queries stack the hero and event cards on smaller screens. `clamp()` allows some headings to scale with the viewport within a minimum and maximum size.

The page uses semantic sections and heading levels, labeled navigation, a skip link, visible keyboard focus, and meaningful button labels. FAQ buttons expose their expanded state through `aria-expanded`; their answer panels use `hidden` when collapsed. Decorative SVGs are hidden from assistive technology where their meaning is already given by text.

## Where to make common edits

| Change | Edit |
| --- | --- |
| Event titles, descriptions, dates, and links | `events` in `src/App.jsx` |
| FAQ questions and answers | `faqs` in `src/App.jsx` |
| Hero, About, registration, or footer copy | Corresponding JSX section in `src/App.jsx` |
| Main colors, spacing, typography, or mobile layout | `src/styles.css` |
| Eye-tracking limits or easing | `src/components/Robot.jsx` |
| Floating, blinking, or wave timing | `src/components/Robot.css` |
| Robot shape and colors | SVG in `src/components/Robot.jsx` |
| Browser title, description, or Google Fonts | `index.html` |

The official reference is [robotix.nitrr.ac.in/robofest](https://robotix.nitrr.ac.in/robofest). Its March 22–23, 2026 edition has concluded. If updating the page for a future edition, verify the new facts and links before changing the notices. This frontend does not submit registration data.

## Manual checks after editing

- Run `npm run build` and resolve any build errors.
- View both a wide desktop layout and a narrow phone layout; check for clipped text or horizontal scrolling.
- Move the pointer around the robot, leave the window, and click or tap it.
- Open each event dialog and close it using the button, Escape, and the backdrop.
- Open the mobile menu and follow a section link.
- Toggle FAQs and navigate with the keyboard.
- Enable reduced motion in the operating system or browser to check the quieter animation behavior.
- Confirm that registration and event links lead to the intended official pages.

These are suggested checks for future changes, not a claim that every browser and device has been tested.
