import { useId } from "react";
import "./EventArt.css";

/** Lightweight SVG scenes; all motion is CSS and respects reduced-motion preferences. */
export default function EventArt({ type = "war" }) {
  const id = useId().replace(/:/g, "");
  const accent = type === "race" ? "#B8A2FF" : type === "thon" ? "#F3BD75" : "#71EFDC";
  const car = (color, battle = false) => (
    <g>
      <rect x="-25" y="-23" width="17" height="10" rx="3" fill="#060c12" stroke="#50616d" />
      <rect x="8" y="-23" width="17" height="10" rx="3" fill="#060c12" stroke="#50616d" />
      <rect x="-25" y="13" width="17" height="10" rx="3" fill="#060c12" stroke="#50616d" />
      <rect x="8" y="13" width="17" height="10" rx="3" fill="#060c12" stroke="#50616d" />
      <path d="M-29-15H18L30-9V9L18 15H-29Z" fill={`url(#${id}-metal)`} stroke={color} strokeWidth="1.5" />
      <path d="M-15-10H5L13 0 5 10H-15Z" fill="#101e2a" stroke={color} strokeOpacity=".5" />
      <path d="M-8-7V7M-23-12V12" stroke={color} strokeWidth="3" />
      <path d="M24-7V-3M24 3V7" stroke="#e5ffff" strokeWidth="3" />
      {battle && <path d="M30-18 40-12 34 0 40 12 30 18Z" fill={color} fillOpacity=".6" stroke={color} />}
    </g>
  );
  return (
    <svg className={`event-art-svg event-motion event-motion-${type}`} viewBox="0 0 420 240" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-metal`} x2="0" y2="1"><stop stopColor="#607682" /><stop offset="1" stopColor="#20313e" /></linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor={accent} stopOpacity=".16" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient>
        <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke={accent} strokeOpacity=".055" /></pattern>
      </defs>
      <path d="M0 0H420V240H0Z" fill={`url(#${id}-grid)`} />
      <ellipse cx="210" cy="130" rx="200" ry="110" fill={`url(#${id}-halo)`} />
      {type === "war" && <>
        <path d="M65 53H355L384 81V181L355 209H65L36 181V81Z" fill="#0a161e" stroke="#71efdc" strokeOpacity=".25" />
        <path d="M75 64H345M75 198H345M49 88V174M371 88V174" stroke="#71efdc" strokeOpacity=".35" strokeDasharray="8 8" />
        <circle cx="210" cy="131" r="54" stroke="#71efdc" strokeOpacity=".12" />
        <path d="M210 65V198" stroke="#71efdc" strokeOpacity=".15" strokeDasharray="4 6" />
        <g transform="translate(210 131)">
          <g className="battle-bot battle-left">{car("#71efdc", true)}</g>
          <g className="battle-bot battle-right"><g transform="rotate(180)">{car("#ff9b75", true)}</g></g>
          <g className="battle-impact" stroke="#ffdf9a" strokeWidth="3" strokeLinecap="round">
            <path d="M-4-12-13-32M5-14 16-36M-5 15-16 36M7 13 18 29M-10 0-24-5M11 0 27-6" />
            <circle r="12" fill="#fff2b4" fillOpacity=".3" />
          </g>
        </g>
        <text x="210" y="227" textAnchor="middle" fill="#71efdc" opacity=".55" fontSize="8" letterSpacing="3">BATTLE ARENA / HEAD TO HEAD</text>
      </>}
      {type === "race" && <>
        <rect x="40" y="60" width="340" height="145" rx="72" stroke="#273344" strokeWidth="37" />
        <rect x="40" y="60" width="340" height="145" rx="72" stroke="#B8A2FF" strokeOpacity=".4" strokeDasharray="9 9" />
        <rect x="64" y="84" width="292" height="97" rx="48" stroke="#B8A2FF" strokeOpacity=".18" />
        <path d="M206 42V79M214 42V79" stroke="#e1d7ff" strokeWidth="5" strokeDasharray="5 5" />
        <text x="210" y="134" textAnchor="middle" fill="#b8a2ff" fontSize="13" fontWeight="600" letterSpacing="4">FULL THROTTLE</text>
        <text x="210" y="151" textAnchor="middle" fill="#7b739a" fontSize="8" letterSpacing="2">03 BOTS / ONE FINISH LINE</text>
        {["#b8a2ff", "#71efdc", "#ffbd75"].map((color, i) => <g key={color} className={`race-car race-car-${i}`}><g transform="scale(.55)">{car(color)}</g></g>)}
      </>}
      {type === "thon" && <>
        <path d="M58 196H362M90 202V213M330 202V213" stroke="#776247" strokeWidth="3" />
        <rect x="58" y="68" width="96" height="76" rx="6" fill="#101e27" stroke="#f3bd75" strokeOpacity=".5" />
        <path d="M106 144V163M83 164H130" stroke="#776247" strokeWidth="4" />
        <g className="build-code" stroke="#f3bd75" strokeWidth="3"><path d="M69 84H84M92 84H130M69 96H105M78 108H139M69 120H91M100 120H121" /></g>
        <path d="M154 110H174V155H194" stroke="#f3bd75" strokeOpacity=".4" strokeDasharray="4 5" />
        <ellipse cx="251" cy="188" rx="62" ry="9" fill="#f3bd75" fillOpacity=".08" />
        <g className="build-body"><rect x="224" y="128" width="54" height="44" rx="12" fill={`url(#${id}-metal)`} stroke="#f3bd75" /><path d="M241 148H261M251 138V158" stroke="#f3bd75" strokeWidth="3" /></g>
        <g className="build-head"><rect x="216" y="73" width="70" height="45" rx="15" fill={`url(#${id}-metal)`} stroke="#f3bd75" /><rect x="224" y="81" width="54" height="28" rx="9" fill="#091722" /><path d="M237 91V99M265 91V99" stroke="#f3bd75" strokeWidth="5" strokeLinecap="round" /></g>
        <g className="build-arms" stroke="#829397" strokeWidth="10" strokeLinecap="round"><path d="M212 135 204 160M290 135 298 160" /></g>
        <g stroke="#829397" strokeWidth="13" strokeLinecap="round"><path d="M237 177V185M266 177V185" /></g>
        <path className="build-scan" d="M189 0H314" stroke="#f3bd75" strokeWidth="2" />
        <text x="210" y="227" textAnchor="middle" fill="#f3bd75" opacity=".65" fontSize="8" letterSpacing="3">IDEA → CODE → BUILD → REPEAT</text>
      </>}
    </svg>
  );
}
