import { useEffect, useRef } from "react";
import raceImage from "../assets/roborace-cinematic.png";
import thonImage from "../assets/robothon-cinematic.png";
import "./CinematicEvent.css";

/** Generated artwork with layered camera, light and particle animation, not video footage. */
export default function CinematicEvent({ type }) {
  const root = useRef(null);
  const race = type === "race";
  useEffect(() => {
    let visible = false;
    const sync = () => root.current?.classList.toggle("cinema-paused", !visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div ref={root} className={`event-cinema cinema-${type} cinema-paused`} aria-hidden="true">
    <div className="cinema-camera">
      <img src={race ? raceImage : thonImage} alt="" loading="lazy" decoding="async" />
      {race ? <>
        <div className="race-headlight" />
        <div className="race-track-glow" />
        {Array.from({length:12},(_,i)=><i key={i} className="race-speed-streak" style={{"--y":`${30+i*6}%`,"--delay":`${-i*.29}s`,"--duration":`${1.1+(i%4)*.2}s`}} />)}
        <div className="race-dust" />
      </> : <>
        <div className="lab-worklight" />
        <div className="lab-monitor-light" />
        <div className="lab-scan" />
        {Array.from({length:18},(_,i)=><i key={i} className="lab-spark" style={{"--dx":`${Math.cos(i*2.4)*(15+i*3)}px`,"--dy":`${-20-(i%6)*9}px`,"--delay":`${-i*.19}s`,"--duration":`${1.4+(i%3)*.25}s`}} />)}
      </>}
    </div>
    <div className="cinema-shade" />
  </div>;
}
