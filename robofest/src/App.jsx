import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  X,
  Menu,
  MapPin,
  CalendarDays,
  Cpu,
  Crosshair,
  Zap,
  Code2,
  Bot,
  MoveUpRight,
  Plus,
} from "lucide-react";
import Robot from "./components/Robot.jsx";
import EventArt from "./components/EventArt.jsx";

const OFFICIAL_URL = "https://robotix.nitrr.ac.in/robofest";

// Event facts are from the official Robofest page. Do not use the recruitment form.
const events = [
  {
    id: "war",
    number: "01",
    title: "Robowar",
    category: "COMBAT & CONTROL",
    accent: "mint",
    description:
      "Built to battle. Engineered to outlast. Bring your bot into the arena and let your engineering do the talking.",
    icon: Crosshair,
    team: "1–4 members",
    format: "8 kg class",
    date: "22 March 2026",
    detail:
      "A wireless, remote-controlled robot combat competition. Design a battle-ready machine that balances strength, control, and resilience. The official event page contains the complete rules and safety requirements.",
    url: "https://unstop.com/competitions/robowars-robofest-26-robofest-26-national-institute-of-technology-nit-raipur-1656702",
  },
  {
    id: "race",
    number: "02",
    title: "Roborace",
    category: "SPEED & PRECISION",
    accent: "purple",
    description:
      "Every turn is a test. Every second counts. Take on an obstacle track where a clever build beats raw speed.",
    icon: Zap,
    team: "1–4 members",
    format: "Obstacle track",
    date: "23 March 2026",
    detail:
      "Build your own robot to navigate an obstacle track with speed and precision. The published specifications list a 5 kg weight limit and a maximum size of 25 × 25 × 25 cm. Check the official rules for full requirements.",
    url: "https://unstop.com/competitions/roborace-robofest26-robofest-26-national-institute-of-technology-nit-raipur-1655808",
  },
  {
    id: "thon",
    number: "03",
    title: "Robothon",
    category: "CODE & CREATE",
    accent: "orange",
    description:
      "Big problems. Bold ideas. Turn a blank canvas into a robotics breakthrough in a 24-hour building sprint.",
    icon: Code2,
    team: "2–4 members",
    format: "24-hour hackathon",
    date: "22–23 March 2026",
    detail:
      "A simulation-based robotics hackathon with challenges across drones, underwater robotics, nanobots, and six-legged rovers. Collaborate, prototype, and demonstrate your approach over 24 hours.",
    url: "https://robotix.nitrr.ac.in/robofest/robothon",
  },
];

const faqs = [
  [
    "What is Robofest?",
    "Robofest is a robotics and technology event presented by ROBOTiX Club, NIT Raipur. The 2026 edition is part of ANANTYA’26 and brings together competitions in building, coding, and innovation.",
  ],
  [
    "Do I need to be an expert in robotics?",
    "There are different ways to get involved, from programming and problem-solving to designing a physical robot. Read the official requirements for your chosen event and pick a challenge that fits your experience.",
  ],
  [
    "Can I participate with a team?",
    "Yes. The featured events accept teams: Robowar and Roborace list 1–4 members, while Robothon lists 2–4 members. Always confirm the rules on the official event page.",
  ],
  [
    "How do I register?",
    "The published 2026 edition took place on 22–23 March 2026. This is a recruitment design project, so it does not collect registrations. Visit the official ROBOTiX website for future dates, eligibility, fees, and registration updates.",
  ],
];

function Brand({ footer = false }) {
  return (
    <a
      className={`brand${footer ? " brand-footer" : ""}`}
      href="#home"
      aria-label="ROBOTiX Club home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <Bot size={27} strokeWidth={1.8} />
      </span>
      <span className="brand-word">
        ROBOT<span>i</span>X<small>CLUB · NIT RAIPUR</small>
      </span>
    </a>
  );
}

function EventDialog({ event, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [returnFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      className={`event-dialog ${event.accent}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-labelledby="event-dialog-title"
    >
      <div className="dialog-inner">
        <button
          className="dialog-close icon-button"
          onClick={onClose}
          aria-label="Close event details"
          autoFocus
        >
          <X size={22} />
        </button>
        <span className="eyebrow">
          EVENT {event.number} / {event.category}
        </span>
        <h2 id="event-dialog-title">
          {event.title}
          <span>.</span>
        </h2>
        <div className="dialog-meta">
          <span>
            <CalendarDays size={15} />
            {event.date}
          </span>
          <span>
            <Cpu size={15} />
            {event.format}
          </span>
        </div>
        <p>{event.detail}</p>
        <p className="edition-note">
          2026 edition · This event has concluded. The official page is linked
          for reference and future updates.
        </p>
        <a
          className="button button-primary"
          href={event.url}
          target="_blank"
          rel="noreferrer"
        >
          Official event details
          <ArrowUpRight size={18} />
        </a>
      </div>
    </dialog>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const menuButtonRef = useRef(null);
  const eventTriggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Brand />
          <nav
            className={`desktop-nav ${menuOpen ? "is-open" : ""}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            {[
              ["home", "Home"],
              ["about", "About"],
              ["events", "Events"],
              ["faq", "FAQs"],
            ].map(([id, label]) => (
              <a
                key={id}
                className={activeSection === id ? "active" : ""}
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
            <a className="mobile-register" href="#register" onClick={closeMenu}>
              Registration <ArrowUpRight size={15} />
            </a>
          </nav>
          <a className="button button-nav" href="#register">
            Get involved <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-toggle icon-button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="edition-badge">
                <span className="status-dot" /> ROBOTiX CLUB PRESENTS{" "}
                <span className="badge-divider" /> ANANTYA ’26
              </div>
              <p className="hero-kicker">
                ROBOFEST <span>2026</span>
              </p>
              <h1 id="hero-title">
                Build beyond
                <br />
                the <span>ordinary.</span>
              </h1>
              <p className="hero-description">
                A little curiosity. A lot of possibility.
                <br className="desktop-break" /> Step into a world where your
                ideas move, think,
                <br className="desktop-break" /> and come to life.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#events">
                  Explore the events <ArrowUpRight size={19} />
                </a>
                <a className="button button-text" href="#about">
                  Discover Robofest <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-details">
                <span>
                  <MapPin size={15} />
                  NIT Raipur, India
                </span>
                <span className="meta-line" />
                <span>
                  <CalendarDays size={15} />
                  22–23 March · 2026 edition
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="orbit orbit-one" aria-hidden="true" />
              <div className="orbit orbit-two" aria-hidden="true" />
              <span className="visual-cross cross-one" aria-hidden="true">
                +
              </span>
              <span className="visual-cross cross-two" aria-hidden="true">
                +
              </span>
              <div className="robot-tag">
                <span className="status-dot" /> HELLO, HUMAN.
              </div>
              <Robot />
              <div className="cursor-hint">
                <span className="pointer-hint">Click me to say hi!</span>
                <span className="touch-hint">Tap me to say hi!</span>
              </div>
            </div>
            <div className="hero-bottom">
              <span>HUMAN CURIOSITY. ROBOTIC POSSIBILITIES.</span>
              <a href="#about">
                SCROLL TO EXPLORE <ArrowDown size={15} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="about-section section-pad container"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-label">
            <span>01 / THE IDEA</span>
            <span className="label-line" />
          </div>
          <div className="about-grid">
            <div>
              <h2 id="about-title">
                Not just a fest.
                <br />A <span className="serif-accent">spark</span> for what’s
                next.
              </h2>
              <div className="about-signature">
                <span className="tiny-bracket">[</span>
                <Cpu size={22} />
                <span>
                  IMAGINED BY YOU.
                  <br />
                  <strong>POWERED BY ROBOTiX.</strong>
                </span>
                <span className="tiny-bracket">]</span>
              </div>
            </div>
            <div className="about-copy">
              <p>
                Some see a pile of parts.
                <br />
                <span>We see the beginning of something incredible.</span>
              </p>
              <p>
                Robofest brings curious minds together at NIT Raipur to build,
                experiment, and push the possibilities of robotics. Presented by
                ROBOTiX Club as part of ANANTYA ’26, it’s where classroom ideas
                meet real challenges.
              </p>
              <p>
                From your first circuit to your next breakthrough—there’s a
                challenge waiting for you.
              </p>
              <a className="inline-link" href="#events">
                Find your challenge <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="about-facts">
            <div>
              <strong>
                02<span>/</span>
              </strong>
              <span>DAYS OF DISCOVERY</span>
            </div>
            <div>
              <strong>
                07<span>/</span>
              </strong>
              <span>EVENTS. ENDLESS IDEAS.</span>
            </div>
            <div>
              <strong>
                01<span>/</span>
              </strong>
              <span>COMMUNITY OF BUILDERS</span>
            </div>
            <div className="fact-location">
              <MapPin size={30} />
              <span>
                NATIONAL INSTITUTE
                <br />
                OF TECHNOLOGY, RAIPUR
              </span>
            </div>
          </div>
        </section>

        <section
          className="events-section section-pad"
          id="events"
          aria-labelledby="events-title"
        >
          <div className="container">
            <div className="section-label">
              <span>02 / CHOOSE YOUR CHALLENGE</span>
              <span className="label-line" />
              <span className="section-side-note">BUILT FOR THE CURIOUS</span>
            </div>
            <div className="section-heading">
              <div>
                <h2 id="events-title">
                  Find your <span className="serif-accent">arena.</span>
                </h2>
                <p>
                  Different challenges. One thing in common: you, building
                  something great.
                </p>
              </div>
              <a
                className="inline-link"
                href={OFFICIAL_URL + "#events"}
                target="_blank"
                rel="noreferrer"
              >
                All 7 events <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="event-grid">
              {events.map((event) => {
                const Icon = event.icon;
                return (
                  <article
                    className={`event-card ${event.accent}`}
                    key={event.id}
                  >
                    <div className="event-art">
                      <span className="event-number">/{event.number}</span>
                      <span className="event-art-label">ROBOFEST ’26</span>
                      <EventArt type={event.id} />
                      <span className="art-cross" aria-hidden="true">
                        +
                      </span>
                    </div>
                    <div className="event-content">
                      <div className="event-category">
                        <Icon size={14} />
                        {event.category}
                      </div>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <div className="event-tags">
                        <span>{event.team}</span>
                        <span>{event.format}</span>
                      </div>
                      <button
                        className="event-button"
                        onClick={(e) => {
                          eventTriggerRef.current = e.currentTarget;
                          setSelectedEvent(event);
                        }}
                      >
                        Explore event{" "}
                        <span>
                          <ArrowUpRight size={19} />
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="events-footnote">
              <span className="status-dot" />
              <span>
                Arena, workshop, or a blank screen. Great things start when you
                show up.
              </span>
              <span className="footnote-coordinate">
                NIT RAIPUR / CHHATTISGARH
              </span>
            </div>
          </div>
        </section>

        <section
          className="register-section section-pad container"
          id="register"
          aria-labelledby="register-title"
        >
          <div className="register-panel">
            <div className="register-decoration" aria-hidden="true">
              <div />
              <div />
              <div />
              <Cpu size={96} strokeWidth={0.6} />
            </div>
            <div className="register-content">
              <span className="eyebrow">
                <span className="status-dot" /> LESS SCROLLING. MORE BUILDING.
              </span>
              <h2 id="register-title">
                The future won’t
                <br />
                build <span className="serif-accent">itself.</span>
              </h2>
              <p>
                Find your people. Take on a challenge.
                <br />
                Make something you’re proud to call yours.
              </p>
              <a
                className="button button-primary"
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
              >
                Registration & updates <ArrowUpRight size={19} />
              </a>
              <p className="registration-note">
                The March 2026 edition has concluded.
                <br />
                Check ROBOTiX for future events and registration updates.
              </p>
            </div>
            <div className="register-corner" aria-hidden="true">
              YOUR NEXT CHAPTER / STARTS HERE <ArrowUpRight size={16} />
            </div>
          </div>
        </section>

        <section
          className="faq-section section-pad container"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="faq-heading">
            <div className="section-label">
              <span>03 / GOOD TO KNOW</span>
            </div>
            <h2 id="faq-title">
              Curious?
              <br />
              <span className="serif-accent">Good.</span>
            </h2>
            <p>That’s how every great idea starts.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div
                className={`faq-item ${openFaq === i ? "is-open" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="faq-number">0{i + 1}</span>
                    {question}
                    <ChevronDown size={19} />
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  hidden={openFaq !== i}
                >
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand footer />
              <p>
                A community of curious minds.
                <br />
                Building things that move the world.
              </p>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#events">Events</a>
              <a href={OFFICIAL_URL} target="_blank" rel="noreferrer">
                Official ROBOTiX <ArrowUpRight size={14} />
              </a>
            </div>
            <a className="back-top" href="#home" aria-label="Back to top">
              <ArrowUpRight size={23} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 · ROBOFEST concept for ROBOTiX Club, NIT Raipur.</span>
            <span>
              Made by <strong>Ayush Chauhan</strong> · AI-assisted
            </span>
          </div>
        </div>
      </footer>
      {selectedEvent && (
        <EventDialog
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          returnFocusRef={eventTriggerRef}
        />
      )}
    </>
  );
}
