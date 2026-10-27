import { useEffect, useRef } from "react";
import videoUrl from "../assets/robowar-loop.mp4";
import posterUrl from "../assets/robowar-poster.jpg";
import raceVideoUrl from "../assets/roborace-loop.mp4";
import racePosterUrl from "../assets/roborace-poster.jpg";
import thonVideoUrl from "../assets/robothon-loop.mp4";
import thonPosterUrl from "../assets/robothon-poster.jpg";

const media = {
  war: { src: videoUrl, poster: posterUrl },
  race: { src: raceVideoUrl, poster: racePosterUrl },
  thon: { src: thonVideoUrl, poster: thonPosterUrl },
};

export default function EventVideo({ type }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !reduced.matches) {
        video.play().catch(() => { /* The poster remains visible if autoplay is unavailable. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      video.pause();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return <video ref={ref} className="event-video" src={media[type].src} poster={media[type].poster}
    muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />;
}
