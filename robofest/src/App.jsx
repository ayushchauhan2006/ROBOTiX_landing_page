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
import RobotChat from "./components/RobotChat.jsx";
import EventVideo from "./components/EventVideo.jsx";
import HeroCircuit from "./components/HeroCircuit.jsx";
import RobotixCircuit from "./components/RobotixCircuit.jsx";
import useScrollReveal from "./hooks/useScrollReveal.js";

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
      "Design and build combat robots that can withstand intense battles. Test your engineering skills in the arena.",
    icon: Crosshair,
    team: "1–4 members",
    format: "8 kg class",
    date: "22 March 2026",
    detail:
      "A wireless, remote-controlled robot combat competition. Teams design battle-ready machines balancing offensive power, defensive strategy, and precise control. Robots must meet weight and safety specifications detailed on the official event page.",
    url: "https://unstop.com/competitions/robowars-robofest-26-robofest-26-national-institute-of-technology-nit-raipur-1656702",
  },
  {
    id: "race",
    number: "02",
    title: "Roborace",
    category: "SPEED & PRECISION",
    accent: "purple",
    description:
      "Navigate obstacle courses where smart design matters more than raw speed. Build a robot that can handle the challenge.",
    icon: Zap,
    team: "1–4 members",
    format: "Obstacle track",
    date: "23 March 2026",
    detail:
      "Build a robot to complete an obstacle course as quickly as possible. Specifications include a 5 kg weight limit and maximum dimensions of 25 × 25 × 25 cm. Track details and full rules are available on the official event page.",
    url: "https://unstop.com/competitions/roborace-robofest26-robofest-26-national-institute-of-technology-nit-raipur-1655808",
  },
  {
    id: "thon",
    number: "03",
    title: "Robothon",
    category: "CODE & CREATE",
    accent: "orange",
    description:
      "A 24-hour robotics hackathon. Tackle simulation challenges in drones, underwater bots, and autonomous systems.",
    icon: Code2,
    team: "2–4 members",
    format: "24-hour hackathon",
    date: "22–23 March 2026",
    detail:
      "A simulation-based robotics hackathon with challenges across multiple domains: drones, underwater robotics, nanobots, and six-legged rovers. Teams collaborate to prototype and demonstrate solutions within 24 hours.",
    url: "https://robotix.nitrr.ac.in/robofest/robothon",
  },
];

const faqs = [
  [
    "What is Robofest?",
    "Robofest is NIT Raipur’s annual robotics festival, organized by ROBOTiX Club as part of ANANTYA. It features competitive events in robot combat, racing, and simulation-based challenges for students across India.",
  ],
  [
    "Do I need robotics experience?",
    "Not necessarily. Events range from hardware-focused competitions like Robowar to software-based challenges like Robothon. Check the specific requirements for each event to find what matches your skill level.",
  ],
  [
    "What are the team size requirements?",
    "Robowar and Roborace: 1–4 members. Robothon: 2–4 members. Check the official event pages for complete eligibility criteria.",
  ],
  [
    "How do I register?",
    "This website showcases the 2026 event design. The March 2026 edition has concluded. For future editions, registration details, and dates, visit the official ROBOTiX website.",
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
  useScrollReveal();
  const [chatOpen, setChatOpen] = useState(false);
  const chatTriggerRef = useRef(null);
  const openChat = (event) => { chatTriggerRef.current = event.currentTarget; setChatOpen(true); };
  const closeChat = (restoreFocus = true) => { setChatOpen(false); if (restoreFocus !== false && chatTriggerRef.current?.isConnected) chatTriggerRef.current.focus({ preventScroll: true }); };
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showHangingRobot, setShowHangingRobot] = useState(false);
  const [hangingTop, setHangingTop] = useState(88);
  const headerRef = useRef(null);
  const heroRobotRef = useRef(null);
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

  useEffect(() => {
    let frame = 0;
    const checkRobot = () => {
      frame = 0;
      const robot = heroRobotRef.current?.getBoundingClientRect();
      const header = headerRef.current?.getBoundingClientRect();
      if (robot && header) {
        setShowHangingRobot(robot.bottom <= header.bottom);
        setHangingTop(header.bottom - 5);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(checkRobot); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (heroRobotRef.current) observer.observe(heroRobotRef.current);
    checkRobot();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header ref={headerRef} className="site-header">
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
      {showHangingRobot && !menuOpen && !selectedEvent && (
        <div className="header-hanging-robot" style={{ top: hangingTop }}>
          <Robot hanging onAsk={openChat} />
          <button className="robot-ask-banner" type="button" onClick={openChat} aria-controls="bolt-chat" aria-expanded={chatOpen}>Ask me your doubts</button>
        </div>
      )}

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <HeroCircuit />
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
                Build beyond the <span>ordinary.</span>
              </h1>
              <p className="hero-description">
                Where robotics, AI, and innovation come to life.
                <br className="desktop-break" /> Build intelligent machines, solve
                real-world challenges, and turn bold ideas into working
                technology at NIT Raipur.
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
            <div ref={heroRobotRef} className="hero-visual">
              <HeroCircuit portal />
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
              <Robot onAsk={openChat} />
              <div className="hero-ask-callout">
                <button className="robot-ask-banner" type="button" onClick={openChat} aria-controls="bolt-chat" aria-expanded={chatOpen}><Cpu size={18} /> Ask me your doubts <ArrowUpRight size={16} /></button>
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
          <div className="section-label" data-reveal>
            <span>01 / THE IDEA</span>
            <span className="label-line" />
          </div>
          <div className="about-grid">
            <div data-reveal>
              <h2 id="about-title">
                Not just a competition.
                <br />A <span className="serif-accent">platform</span> for builders.
              </h2>
              <div className="about-signature">
                <span className="tiny-bracket">[</span>
                <Cpu size={22} />
                <span>
                  DESIGNED FOR STUDENTS.
                  <br />
                  <strong>ORGANIZED BY ROBOTiX.</strong>
                </span>
                <span className="tiny-bracket">]</span>
              </div>
            </div>
            <div className="about-copy" data-reveal style={{ "--reveal-delay": "100ms" }}>
              <p>
                Robotics competitions that challenge your skills.
                <br />
                <span>Real problems. Practical solutions.</span>
              </p>
              <p>
                Robofest brings together students from across India at NIT Raipur
                for hands-on robotics challenges. Organized by ROBOTiX Club as part
                of ANANTYA ‘26, it features competitions ranging from combat robots
                to simulation-based hackathons.
              </p>
              <p>
                Whether you’re building hardware or writing algorithms, there’s a
                competition designed to test your abilities.
              </p>
              <a className="inline-link" href="#events">
                View competitions <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="about-facts">
            <div data-reveal>
              <strong>
                02<span>/</span>
              </strong>
              <span>DAYS OF DISCOVERY</span>
            </div>
            <div data-reveal style={{ "--reveal-delay": "70ms" }}>
              <strong>
                07<span>/</span>
              </strong>
              <span>EVENTS. ENDLESS IDEAS.</span>
            </div>
            <div data-reveal style={{ "--reveal-delay": "140ms" }}>
              <strong>
                01<span>/</span>
              </strong>
              <span>COMMUNITY OF BUILDERS</span>
            </div>
            <div className="fact-location" data-reveal style={{ "--reveal-delay": "210ms" }}>
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
            <div className="section-label" data-reveal>
              <span>02 / CHOOSE YOUR CHALLENGE</span>
              <span className="label-line" />
              <span className="section-side-note">BUILT FOR THE CURIOUS</span>
            </div>
            <div className="section-heading" data-reveal>
              <div>
                <h2 id="events-title">
                  Choose your <span className="serif-accent">competition.</span>
                </h2>
                <p>
                  Three main events. Different challenges. Pick the one that
                  matches your skills.
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
              {events.map((event, index) => {
                const Icon = event.icon;
                return (
                  <article
                    className={`event-card ${event.accent}`}
                    key={event.id}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 100}ms` }}
                  >
                    <div className="event-art">
                      <span className="event-number">/{event.number}</span>
                      <span className="event-art-label">ROBOFEST ’26</span>
                      <EventVideo type={event.id} />
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
            <div className="events-footnote" data-reveal>
              <span className="status-dot" />
              <span>
                Competitions designed to challenge engineering, coding, and
                problem-solving skills.
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
          <div className="register-panel" data-reveal>
            <div className="register-content">
              <span className="eyebrow">
                <span className="status-dot" /> READY TO PARTICIPATE?
              </span>
              <h2 id="register-title">
                Join the next
                <br />
                <span className="serif-accent">edition.</span>
              </h2>
              <p>
                Connect with fellow builders. Test your skills.
                <br />
                Be part of NIT Raipur’s premier robotics event.
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
            <RobotixCircuit />
          </div>
        </section>

        <section
          className="faq-section section-pad container"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="faq-heading" data-reveal>
            <div className="section-label">
              <span>03 / FREQUENTLY ASKED</span>
            </div>
            <h2 id="faq-title">
              Questions?
              <br />
              <span className="serif-accent">Answered.</span>
            </h2>
            <p>Everything you need to know about participating.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div
                className={`faq-item ${openFaq === i ? "is-open" : ""}`}
                key={question}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` }}
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
          <div className="footer-main" data-reveal>
            <div>
              <Brand footer />
              <p>
                NIT Raipur's robotics community.
                <br />
                Building, competing, innovating.
              </p>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#events">Events</a>
              <a href="https://robotix.nitrr.ac.in/home" target="_blank" rel="noreferrer">
                Official ROBOTiX <ArrowUpRight size={14} />
              </a>
            </div>
            <a className="back-top" href="#home" aria-label="Back to top">
              <ArrowUpRight size={23} />
            </a>
          </div>
          <div className="footer-bottom" data-reveal>
            <span>© 2026 · ROBOFEST concept for ROBOTiX Club, NIT Raipur.</span>
            <span>
              Made by <strong>Ayush Chauhan</strong>
            </span>
          </div>
        </div>
      </footer>
      <RobotChat open={chatOpen && !selectedEvent && !menuOpen} onClose={closeChat} events={events} faqs={faqs} />
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
