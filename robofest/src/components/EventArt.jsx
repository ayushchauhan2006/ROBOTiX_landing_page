import { useEffect, useId, useRef } from "react";
import "./EventArt.css";

const TAU = Math.PI * 2;
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => { const x = Math.max(0, Math.min(1, t)); return x * x * (3 - 2 * x); };

/** A shared clock drives SVG transforms directly, keeping motion independent of React renders. */
export default function EventArt({ type = "war" }) {
  const id = useId().replace(/:/g, "");
  const scene = useRef(null);
  const accent = type === "race" ? "#B8A2FF" : type === "thon" ? "#F3BD75" : "#71EFDC";
  const paint = (name) => `url(#${id}-${name})`;
  useEffect(() => {
    const root = scene.current;
    const parts = Object.fromEntries([...root.querySelectorAll("[data-part]")].map(el => [el.dataset.part, el]));
    const transform = (name, value) => parts[name]?.setAttribute("transform", value);
    const opacity = (name, value) => parts[name]?.setAttribute("opacity", String(value));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = true, elapsed = 0, last = 0;
    const draw = (time) => {
      if (type === "war") {
        const p = (time % 4.8) / 4.8;
        const approach = p < .42 ? smooth((p - .13) / .29) : p < .53 ? 1 - .14 * Math.sin((p - .42) / .11 * Math.PI) : 1 - smooth((p - .62) / .3);
        const distance = mix(108, 48, approach);
        const recoil = p > .42 && p < .53 ? Math.sin((p - .42) * 110) * 2 : 0;
        transform("left", `translate(${210 - distance} ${133 + recoil})`);
        transform("right", `translate(${210 + distance} ${133 - recoil}) rotate(180)`);
        transform("blade", `rotate(${time * 1100})`);
        const impact = p > .415 && p < .52 ? (p - .415) / .105 : -1;
        opacity("sparks", impact < 0 ? 0 : 1 - impact);
        transform("sparks", `translate(210 133) scale(${1 + Math.max(0, impact) * 2})`);
        transform("shock", `translate(210 133) scale(${.3 + Math.max(0, impact) * 2.5})`);
        opacity("shock", impact < 0 ? 0 : .7 * (1 - impact));
      } else if (type === "race") {
        // Each car and its trail use the same ellipse, so they cannot drift off the track.
        [0, 1, 2].forEach(i => {
          const theta = time * (.72 + i * .055) + i * TAU / 3;
          const rx = 146 - i * 10, ry = 65 - i * 5;
          const angle = Math.atan2(ry * Math.cos(theta), -rx * Math.sin(theta)) * 180 / Math.PI;
          transform(`car${i}`, `translate(${210 + rx * Math.cos(theta)} ${132 + ry * Math.sin(theta)}) rotate(${angle}) scale(.62)`);
          const points = Array.from({ length: 18 }, (_, j) => {
            const a = theta - j * .024;
            return `${210 + rx * Math.cos(a)},${132 + ry * Math.sin(a)}`;
          }).join(" ");
          parts[`trail${i}`]?.setAttribute("points", points);
        });
      } else {
        // Two-link inverse kinematics keeps the gripper attached while it transfers a component.
        const p = (time % 6) / 6;
        let x = 309, y = 157;
        if (p < .2) y = mix(123, 157, smooth(p / .2));
        else if (p < .62) { const q = smooth((p - .2) / .42); x = mix(309, 218, q); y = 157 - 66 * Math.sin(q * Math.PI); }
        else if (p < .76) { x = 218; y = 157; }
        else { const q = smooth((p - .76) / .24); x = mix(218, 309, q); y = mix(157, 123, q) - 30 * Math.sin(q * Math.PI); }
        const bx = 155, by = 174, l1 = 94, l2 = 87;
        const dx = x - bx, dy = y - by, d = Math.hypot(dx, dy);
        const a = Math.atan2(dy, dx) - Math.acos(Math.max(-1, Math.min(1, (l1*l1 + d*d - l2*l2) / (2*l1*d))));
        const ex = bx + l1 * Math.cos(a), ey = by + l1 * Math.sin(a);
        parts.arm?.setAttribute("d", `M${bx} ${by} L${ex} ${ey} L${x} ${y}`);
        parts.armShine?.setAttribute("d", `M${bx} ${by} L${ex} ${ey} L${x} ${y}`);
        transform("elbow", `translate(${ex} ${ey})`);
        transform("gripper", `translate(${x} ${y})`);
        const carrying = p >= .2 && p < .62;
        transform("chip", `translate(${carrying ? x : p < .2 ? 309 : 218} ${carrying ? y + 12 : 169})`);
        opacity("chip", p > .92 ? 0 : 1);
        opacity("success", p > .64 && p < .9 ? 1 : .12);
        parts.code?.setAttribute("stroke-dashoffset", String(-time * 22));
      }
    };
    const tick = (now) => {
      if (last) elapsed += Math.min(now - last, 50) / 1000;
      last = now; draw(elapsed); frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (reduced.matches) draw(type === "thon" ? 4.2 : 0);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root); reduced.addEventListener("change", sync); document.addEventListener("visibilitychange", sync); draw(0);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [type]);

  const bot = (color, weapon = false) => <>
    <ellipse cy="8" rx="47" ry="31" fill="#000" opacity=".45" />
    {[-1, 1].map(side => <g key={side} transform={`translate(0 ${side * 24})`}>
      <rect x="-31" y="-8" width="62" height="16" rx="6" fill="#080e16" stroke="#52616e" />
      {[-23, -12, 0, 12, 23].map(x => <path key={x} d={`M${x}-6V6`} stroke="#344550" strokeWidth="4" />)}
    </g>)}
    <path d="M-33-20H23L35-9V14L23 24H-33Z" fill="#111f2b" stroke="#536775" />
    <path d="M-33-24H23L35-13V9L23 20H-33Z" fill={paint("metal")} stroke={color} strokeOpacity=".7" />
    <path d="M-21-15H11L24-5V6L11 13H-21Z" fill="#10212d" stroke="#7c939e" strokeOpacity=".4" />
    <path d="M-15-9H9M-15-3H9M-15 3H9" stroke={color} strokeWidth="2" />
    <path d="M-28-16V12" stroke={color} strokeWidth="4" />
    <circle cx="17" cy="0" r="4" fill={color} />
    {weapon ? <g transform="translate(40 0)"><g data-part="blade"><circle r="15" fill="#314a54" stroke={color} /><path d="M-19-4H19V4H-19ZM-4-19H4V19H-4Z" fill="#b0d9d5" /><circle r="5" fill="#112a34" stroke={color} /></g></g> : <path d="M29-21 46-26 46 26 29 21Z" fill={color} fillOpacity=".55" stroke={color} />}
    {[[-27,-18],[-27,15],[23,-13],[23,10]].map(([x,y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.5" fill="#d0e4e7" />)}
  </>;
  const racer = (color) => <>
    <ellipse cy="5" rx="28" ry="17" fill="#000" opacity=".6" />
    {[-1,1].map(n => <g key={n} fill="#080d16" stroke="#687683"><rect x="-21" y={n*14-4} width="12" height="8" rx="2" /><rect x="10" y={n*14-4} width="12" height="8" rx="2" /></g>)}
    <path d="M-25-11H10L29-5V5L10 11H-25Z" fill={paint("metal")} stroke={color} strokeWidth="2" />
    <path d="M-8-7H5L13 0 5 7H-8Z" fill="#071421" stroke={color} />
    <path d="M-22-15V15M20-3H28M20 3H28" stroke={color} strokeWidth="4" />
  </>;
  return <svg ref={scene} className={`event-art-svg premium-event-scene`} viewBox="0 0 420 250" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2=".4" y2="1"><stop stopColor="#81959d" /><stop offset=".42" stopColor="#394f5e" /><stop offset="1" stopColor="#1b2a36" /></linearGradient>
      <radialGradient id={`${id}-halo`}><stop stopColor={accent} stopOpacity=".16" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient>
      <pattern id={`${id}-grid`} width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" stroke={accent} strokeOpacity=".045" /></pattern>
    </defs>
    <path d="M0 0H420V250H0Z" fill="#0b121b" />
    <path d="M0 0H420V250H0Z" fill={paint("grid")} />
    <ellipse cx="210" cy="133" rx="200" ry="113" fill={paint("halo")} />
    {type === "war" && <>
      <path d="M55 66H365L391 91V184L365 209H55L29 184V91Z" fill="#101f29" stroke="#3b5860" />
      <path d="M61 74H359L382 96V179L359 200H61L38 179V96Z" stroke="#71efdc" strokeOpacity=".25" />
      <path d="M69 81H351M69 193H351" stroke="#7d9d90" strokeOpacity=".4" strokeWidth="4" strokeDasharray="10 8" />
      <path d="M210 82V192M80 110H340M80 165H340" stroke="#78c9b7" strokeOpacity=".1" />
      <circle cx="210" cy="137" r="49" stroke="#71efdc" strokeOpacity=".13" />
      <circle data-part="shock" r="28" stroke="#ffca81" strokeWidth="2" opacity="0" />
      <g data-part="left" transform="translate(102 133)">{bot("#71efdc", true)}</g>
      <g data-part="right" transform="translate(318 133) rotate(180)">{bot("#ff8e74")}</g>
      <g data-part="sparks" opacity="0" stroke="#ffe4a0" strokeLinecap="round">{Array.from({length:12},(_,i)=><path key={i} d="M0-12 2-23" transform={`rotate(${i*30})`} strokeWidth={i%2 ? 1 : 2.5} />)}<circle r="7" fill="#fff6cf" /></g>
      <text x="62" y="226" className="scene-caption" fill="#71efdc">01 / SPINNER</text><text x="358" y="226" textAnchor="end" className="scene-caption" fill="#ff8e74">02 / WEDGE</text>
    </>}
    {type === "race" && <>
      <ellipse cx="210" cy="138" rx="170" ry="88" fill="#050a11" />
      <ellipse cx="210" cy="132" rx="146" ry="65" stroke="#2b3449" strokeWidth="43" />
      <ellipse cx="210" cy="132" rx="169" ry="88" stroke="#b8a2ff" strokeOpacity=".3" />
      <ellipse cx="210" cy="132" rx="123" ry="42" fill="#111a28" stroke="#b8a2ff" strokeOpacity=".35" />
      <ellipse cx="210" cy="132" rx="145" ry="65" stroke="#b5adc9" strokeOpacity=".3" strokeDasharray="5 9" />
      {Array.from({length:8},(_,i)=><path key={i} d={`M${205+i%2*6} ${46+Math.floor(i/2)*10}v10`} stroke={i%3 ? "#a8a7c4" : "#202438"} strokeWidth="6" />)}
      <text x="210" y="129" textAnchor="middle" fill="#ded6ff" fontSize="14" fontWeight="600" letterSpacing="3">ROBORACE</text>
      <text x="210" y="146" textAnchor="middle" className="scene-caption" fill="#8c83b0">PRECISION MEETS SPEED</text>
      {["#b8a2ff", "#71efdc", "#ffbd75"].map((color,i)=><g key={color}><polyline data-part={`trail${i}`} stroke={color} strokeOpacity=".24" strokeWidth="6" strokeLinecap="round" /><g data-part={`car${i}`}>{racer(color)}</g></g>)}
      <text x="210" y="235" textAnchor="middle" className="scene-caption" fill="#a89acb">03 AUTONOMOUS BOTS • LIVE CIRCUIT</text>
    </>}
    {type === "thon" && <>
      <path d="M65 184 265 151 367 183 166 222Z" fill="#15232d" stroke="#4e5353" /><path d="M65 184V193L166 231 367 191V183L166 222Z" fill="#0b151f" stroke="#35434a" />
      <g transform="translate(38 63)"><rect width="101" height="75" rx="5" fill="#101e29" stroke="#79664c" /><path d="M0 13H101" stroke="#4a453e" /><circle cx="8" cy="7" r="2" fill="#f3bd75" /><circle cx="16" cy="7" r="2" fill="#71efdc" /><path data-part="code" d="M10 25H83M10 36H65M20 47H91M10 58H72" stroke="#f3bd75" strokeWidth="3" strokeDasharray="12 4 25 8" /><path d="M49 75V88M27 89H73" stroke="#57636a" strokeWidth="4" /></g>
      <path d="M146 183H172L181 191 153 200 133 190Z" fill="#304451" stroke="#8e9994" />
      <rect x="202" y="166" width="41" height="26" rx="3" fill="#12332d" stroke="#81ac87" /><path d="M207 174H238M213 169V186M231 169V186" stroke="#5b8566" />
      <path d="M293 166H326V190H293Z" fill="#27333a" stroke="#695f4d" />
      <g data-part="chip"><rect x="-9" y="-5" width="18" height="13" rx="2" fill="#d6ae71" stroke="#ffdfa4" /><path d="M-5-2H5V5H-5Z" fill="#3b3d36" /></g>
      <path data-part="arm" d="M155 174 196 90 309 157" stroke="#101923" strokeWidth="24" strokeLinejoin="round" />
      <path data-part="armShine" d="M155 174 196 90 309 157" stroke={paint("metal")} strokeWidth="17" strokeLinejoin="round" />
      <circle cx="155" cy="174" r="16" fill="#334a56" stroke="#9ca9a6" /><circle cx="155" cy="174" r="7" fill="#13202a" stroke="#f3bd75" />
      <g data-part="elbow"><circle r="13" fill="#3b515b" stroke="#b3bab0" /><circle r="6" fill="#13202a" stroke="#f3bd75" /></g>
      <g data-part="gripper"><circle r="6" fill="#f3bd75" /><path d="M-6 3-12 10V18M6 3 12 10V18" stroke="#a4b6b6" strokeWidth="4" /></g>
      <g data-part="success" opacity=".12"><circle cx="342" cy="72" r="12" fill="#17372c" stroke="#71efdc" /><path d="m337 72 4 4 7-8" stroke="#71efdc" strokeWidth="2" /></g>
      <text x="210" y="245" textAnchor="middle" className="scene-caption" fill="#c4a273">CODE → SIMULATE → AUTOMATE</text>
    </>}
  </svg>;
}
