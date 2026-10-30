import { useEffect, useRef } from "react";
import "./HeroCircuit.css";

const colors = ["#6889da", "#58b59d", "#ce7483"];
const wires = [
  "M0 94H155L199 138H330L365 103H530",
  "M0 118H140L187 165H310L357 212H490",
  "M0 650H130L191 589H355L414 648H568",
  "M0 674H146L207 613H343L402 672H565",
  "M700 0V70L760 130H916L950 164H1120L1180 104H1440",
  "M740 0V51L793 104H925L961 138H1110L1168 80H1440",
  "M1440 220H1330L1270 280H1170L1123 327",
  "M1440 245H1340L1280 305H1183L1148 340",
  "M1440 635H1320L1250 565H1160L1118 607V780",
  "M1440 660H1308L1238 590H1185L1144 632V780",
  "M640 780V693L695 638V555L746 504",
  "M665 780V705L719 651V568L765 522",
  "M0 32H270L316 78H582L632 128H782",
  "M0 48H260L306 94H570L620 144H775",
  "M190 0V38L225 73H390L419 44H580",
  "M470 0V24L510 64H650L689 103V228L738 277",
  "M490 0V16L522 48H662L705 91V218L753 266",
  "M0 290H44L91 337V438L132 479H208",
  "M0 312H32L72 352V450L119 497H194",
  "M0 540H60L98 578V700L144 746H378",
  "M0 562H44L80 598V712L130 762H366",
  "M260 780V732L299 693H480L520 733H590",
  "M1440 30H1280L1228 82H1060L1018 124",
  "M1440 50H1290L1242 98H1073L1033 138",
  "M1440 352H1384L1340 396V460L1296 504H1212",
  "M1440 374H1396L1360 410V470L1310 522H1224",
  "M1440 738H1300L1260 698H1048L1012 662",
  "M1440 758H1292L1250 718H1036L998 680",
  "M830 780V730L866 694V620L904 582",
  "M852 780V740L886 706V630L918 598",
];
const portalWires = [
  "M0 116H68L112 160V213L145 246",
  "M0 135H59L94 170V224L132 262",
  "M600 105H536L493 148V198L458 233",
  "M600 124H546L511 160V208L473 248",
  "M600 411H535L495 451H448L420 479",
  "M600 430H543L503 470H459L433 496",
  "M0 435H69L103 469H155L186 500",
  "M0 454H60L94 488H142L171 517",
];
const bolts = [
  "M385 78 410 55 413 80 450 59 440 92 480 84 468 113 507 101",
  "M506 202 534 186 525 219 564 207 549 242 584 229",
  "M471 435 502 445 488 467 526 465 510 494 551 511",
  "M128 413 98 426 106 447 73 446 83 474 47 490",
  "M102 167 73 150 80 128 45 130 58 104 20 94",
];

function CircuitChip({ x, y, color }) {
  return <g className="circuit-chip" transform={`translate(${x} ${y})`} style={{ color, "--delay": "0s" }}>
          <path d="M-34-22H-22V-34M-8-34V-22M8-34V-22M22-34V-22H34M34-8H22M34 8H22M34 22H22V34M8 34V22M-8 34V22M-22 34V22H-34M-34 8H-22M-34-8H-22" stroke="currentColor" opacity=".4" />
          <rect x="-22" y="-22" width="44" height="44" rx="5" fill="#081626" stroke="currentColor" strokeOpacity=".5" />
          <rect className="circuit-core" x="-12" y="-12" width="24" height="24" rx="2" stroke="currentColor" fill="currentColor" fillOpacity=".12" />
          <path d="M-6 0H6M0-6V6" stroke="currentColor" opacity=".8" />
  </g>;
}

/** Decorative circuitry uses local coordinates so it stays behind the robot at every breakpoint. */
export default function HeroCircuit({ portal = false }) {
  const root = useRef(null);
  useEffect(() => {
    let visible = false;
    const update = () => root.current?.classList.toggle("circuit-paused", !visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return <div ref={root} className={portal ? "robot-energy" : "hero-circuit"} aria-hidden="true">
    <svg viewBox={portal ? "0 0 600 600" : "0 0 1440 780"} preserveAspectRatio={portal ? "xMidYMid meet" : "xMidYMid slice"} fill="none" focusable="false">
      {portal ? <>
        <CircuitChip x={80} y={505} color={colors[0]} />
        {portalWires.map((d, i) => <g key={d} style={{color: colors[i % 3], "--delay": `${-i * .9}s`, "--duration": "6s"}}>
          <path d={d} stroke="currentColor" strokeWidth="1.1" opacity=".56" />
          <path className="circuit-signal circuit-signal-glow" d={d} pathLength="100" stroke="currentColor" strokeWidth="7" strokeDasharray="7 93" />
          <path className="circuit-signal" d={d} pathLength="100" stroke="currentColor" strokeWidth="2" strokeDasharray="3 97" />
        </g>)}
        <g className="energy-halo">
          <circle cx="300" cy="285" r="243" stroke="#3456ff" strokeWidth="24" opacity=".08" />
          <circle cx="300" cy="285" r="229" stroke="#a3cbff" strokeOpacity=".35" />
          <circle cx="300" cy="285" r="244" stroke="#6084ff" strokeOpacity=".4" strokeDasharray="44 8 3 8" />
          <circle cx="300" cy="285" r="217" stroke="#5279ff" strokeWidth="3" strokeDasharray="92 260 190 320" opacity=".8" />
          <circle cx="300" cy="285" r="234" stroke="#4be1b0" strokeWidth="2" strokeDasharray="45 490 110 825" opacity=".5" />
          <circle cx="300" cy="285" r="251" stroke="#ff6b79" strokeWidth="2" strokeDasharray="65 610 36 870" opacity=".4" />
        </g>
        <g stroke="#75d6f4" strokeOpacity=".35">
          {Array.from({length:48},(_,i)=><path key={i} d={i%4 ? "M300 42V47" : "M300 34V48"} transform={`rotate(${i*7.5} 300 285)`} />)}
        </g>
        <g className="energy-flow">
          <circle cx="300" cy="285" r="229" stroke="#94eaff" strokeWidth="2" strokeDasharray="14 1425" />
          <circle cx="300" cy="285" r="244" stroke="#5ff5b8" strokeWidth="2" strokeDasharray="8 1525" />
        </g>
        {bolts.map((d,i)=><g key={d} className="energy-bolt" style={{"--delay":`${-i*1.7}s`}}>
          <path d={d} stroke={i%2 ? "#66dbff" : "#c2f4ff"} strokeWidth="5" opacity=".15" />
          <path d={d} stroke={i%2 ? "#66dbff" : "#c2f4ff"} strokeWidth="1.2" />
        </g>)}
        {Array.from({length:24},(_,i)=>{
          const a=i*2.399, r=235+(i%4)*12;
          return <g key={i} transform={`translate(${300+Math.cos(a)*r} ${285+Math.sin(a)*r})`}>
            <path className="energy-spark" d="M0 0 3-7" stroke={colors[i%3]} strokeWidth={i%3 ? 1 : 2} style={{"--delay":`${-i*.43}s`}} />
          </g>;
        })}
      </> : <>
        {wires.map((d,i)=><g key={d} style={{color:colors[i%3],"--delay":`${-i*.8}s`, "--duration": `${6 + i % 5}s`}}>
          <path d={d} stroke="currentColor" strokeWidth="3" opacity=".035" />
          <path d={d} stroke="currentColor" strokeWidth="1.1" opacity=".6" />
          <path className="circuit-signal circuit-signal-glow" d={d} pathLength="100" stroke="currentColor" strokeWidth="8" strokeDasharray="6 94" />
          <path className="circuit-signal" d={d} pathLength="100" stroke="currentColor" strokeWidth="2" strokeDasharray="3 97" />
        </g>)}
        <CircuitChip x={1340} y={122} color={colors[1]} />
        {[[155,94],[330,138],[191,589],[355,589],[760,130],[950,164],[1330,220],[1170,280],[1250,565],[1160,565],[695,638],[719,568]].map(([x,y],i)=><g key={i} stroke={colors[i%3]}>
          <circle className="circuit-junction" style={{"--delay": `${-i * .7}s`}} cx={x} cy={y} r="7" strokeOpacity=".5" />
          <circle cx={x} cy={y} r="4" fill="#071726" strokeOpacity=".5" /><circle cx={x} cy={y} r="1.5" fill={colors[i%3]} />
        </g>)}
      </>}
    </svg>
  </div>;
}
