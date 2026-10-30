import { useLayoutEffect } from "react";
import "./scrollReveal.css";

/** Reveal each content block once, without a scroll listener or layout changes. */
export default function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const show = (element, animate = true) => {
      if (element.dataset.revealState === "visible") return;
      element.dataset.revealState = animate ? "entering" : "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) show(target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      // Keep the initial viewport (including restored scroll positions) readable.
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        element.dataset.revealState = "visible";
      } else {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    });

    const finish = (event) => {
      if (event.animationName === "content-reveal") {
        event.target.dataset.revealState = "visible";
      }
    };
    const revealFocused = (event) => {
      const block = event.target.closest?.("[data-reveal]");
      if (block) show(block, false);
    };
    const respectMotion = () => {
      if (motion.matches) elements.forEach((element) => show(element, false));
    };
    document.addEventListener("animationend", finish);
    document.addEventListener("focusin", revealFocused);
    motion.addEventListener("change", respectMotion);

    return () => {
      observer.disconnect();
      document.removeEventListener("animationend", finish);
      document.removeEventListener("focusin", revealFocused);
      motion.removeEventListener("change", respectMotion);
      elements.forEach((element) => delete element.dataset.revealState);
    };
  }, []);
}
