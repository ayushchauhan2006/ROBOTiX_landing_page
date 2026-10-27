import { useId } from "react";
import "./RobotixCircuit.css";

const traces = [
  "M146 146H112L80 114V94H30",
  "M146 166H94L64 196H20",
  "M146 206H110L80 236V264H32",
  "M166 146V108L136 78V30",
  "M196 146V100L226 70V24",
  "M214 146H250L284 112V88H330",
  "M214 176H272L302 146H342",
  "M214 206H252L278 232V264H328",
  "M166 214V256L136 286V330",
  "M196 214V266L226 296V336",
  "M146 186H106L68 224H46",
  "M214 156H262L300 118H342",
];
const terminals = [[30,94],[20,196],[32,264],[136,30],[226,24],[330,88],[342,146],[328,264],[136,330],[226,336],[46,224],[342,118]];
const wireColors = ["#41d9ff", "#b291ff", "#ffbd69", "#67e8b0", "#b291ff", "#ff819e", "#41d9ff", "#67e8b0", "#ff819e", "#ffbd69", "#67e8b0", "#ffbd69"];

export default function RobotixCircuit() {
  const id = useId();
  return <div className="register-circuit" aria-hidden="true">
    <svg viewBox="0 0 360 360" fill="none" focusable="false">
      <defs>
        <linearGradient id={`${id}-rim`} x1="130" y1="130" x2="230" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8b0" /><stop offset=".45" stopColor="#41d9ff" /><stop offset="1" stopColor="#b291ff" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#24b9d6" stopOpacity=".14" /><stop offset="1" stopColor="#24b9d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="180" r="135" fill={`url(#${id}-glow)`} />
      <path d="M114 134V116H134M226 116H246V136M246 226V246H226M134 246H114V226" stroke="#79b8d1" strokeOpacity=".2" />
      {traces.map((d, i) => <g key={d} style={{color: wireColors[i], "--wire-delay": `${-i * .8}s`, "--wire-speed": `${5 + i % 4}s`}}>
        <path d={d} className="register-circuit-wire-glow" />
        <path d={d} className="register-circuit-trace" />
        <path d={d} className="register-circuit-pulse" pathLength="100" />
        <circle cx={terminals[i][0]} cy={terminals[i][1]} r="5" className="register-circuit-terminal" />
        <circle cx={terminals[i][0]} cy={terminals[i][1]} r="1.6" fill="currentColor" />
      </g>)}
      <path d="M151 133H209L227 151V209L209 227H151L133 209V151Z" fill="#0b2032" stroke={`url(#${id}-rim)`} strokeOpacity=".75" />
      <rect x="146" y="146" width="68" height="68" rx="12" fill="#0a1a2b" stroke="currentColor" strokeOpacity=".65" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M180 166V160M160 180H155M200 180H205" />
        <rect x="160" y="167" width="40" height="28" rx="6" />
        <path d="M173 177V182M187 177V182M175 189H185" />
      </g>
      <circle cx="180" cy="158" r="2" fill="currentColor" />
      <g fill="#67e8b0"><circle cx="170" cy="220" r="1.5" /><circle cx="180" cy="220" r="1.5" /><circle cx="190" cy="220" r="1.5" /></g>
    </svg>
  </div>;
}
