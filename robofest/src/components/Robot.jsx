import { useEffect, useId, useRef, useState } from "react";
import "./Robot.css";

/** An original SVG robot. Its gaze follows the page pointer without React rerenders. */
export default function Robot() {
  const prefix = useId().replace(/:/g, "");
  const stageRef = useRef(null);
  const gazeRef = useRef(null);
  const headRef = useRef(null);
  const neckRef = useRef(null);
  const waveTimerRef = useRef(null);
  const [isWaving, setIsWaving] = useState(false);
  const [greetingCount, setGreetingCount] = useState(0);
  const paint = (name) => `url(#${prefix}-${name})`;

  useEffect(() => {
    let frame = 0;
    let gaze = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animateEyes = () => {
      const easing = reducedMotion.matches ? 1 : 0.18;
      gaze.x += (target.x - gaze.x) * easing;
      gaze.y += (target.y - gaze.y) * easing;
      gazeRef.current?.setAttribute(
        "transform",
        `translate(${gaze.x} ${gaze.y})`,
      );

      // A slower, small movement pivots the head around the neck socket.
      const headTarget = reducedMotion.matches ? { x: 0, y: 0 } : target;
      head.x += (headTarget.x - head.x) * 0.1;
      head.y += (headTarget.y - head.y) * 0.1;
      headRef.current?.setAttribute(
        "transform",
        `translate(0 ${head.y * 0.35}) rotate(${head.x * 0.3} 300 300) rotate(-7 300 209)`,
      );
      neckRef.current?.setAttribute(
        "transform",
        `rotate(${head.x * 0.15} 300 310)`,
      );
      const remaining = Math.abs(target.x - gaze.x) + Math.abs(target.y - gaze.y)
        + Math.abs(headTarget.x - head.x) + Math.abs(headTarget.y - head.y);
      if (remaining > 0.05) {
        frame = requestAnimationFrame(animateEyes);
      } else {
        frame = 0;
      }
    };

    const followPointer = (event) => {
      // Touch remains native: tapping the robot waves, and scrolling stays free.
      if (event.pointerType === "touch") return;
      const bounds = stageRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const faceX = bounds.left + bounds.width * 0.5;
      const faceY = bounds.top + bounds.height * 0.35;
      target = {
        x: Math.max(
          -12,
          Math.min(12, ((event.clientX - faceX) / bounds.width) * 22),
        ),
        y: Math.max(
          -8,
          Math.min(8, ((event.clientY - faceY) / bounds.height) * 16),
        ),
      };
      if (!frame) frame = requestAnimationFrame(animateEyes);
    };

    const resetGaze = () => {
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(animateEyes);
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetGaze);
    window.addEventListener("blur", resetGaze);
    reducedMotion.addEventListener("change", resetGaze);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(waveTimerRef.current);
      window.removeEventListener("pointermove", followPointer);
      document.documentElement.removeEventListener("pointerleave", resetGaze);
      window.removeEventListener("blur", resetGaze);
      reducedMotion.removeEventListener("change", resetGaze);
    };
  }, []);

  const wave = () => {
    clearTimeout(waveTimerRef.current);
    // Remount only the waving arm so even rapid clicks restart its animation.
    setGreetingCount((count) => count + 1);
    setIsWaving(true);
    waveTimerRef.current = setTimeout(() => setIsWaving(false), 1700);
  };

  return (
    <button
      ref={stageRef}
      className={`robot-interactive${isWaving ? " robot-is-waving" : ""}`}
      type="button"
      onClick={wave}
      aria-label="Meet Bolt, our robot. Click or press Enter to say hello."
      title="Say hello to Bolt"
    >
      <svg
        className="robot-scene"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`${prefix}-shell`}
            x1="195"
            y1="117"
            x2="401"
            y2="290"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFDF4" />
            <stop offset=".35" stopColor="#DBDDD7" />
            <stop offset=".7" stopColor="#9FA9A8" />
            <stop offset="1" stopColor="#4D6267" />
          </linearGradient>
          <linearGradient
            id={`${prefix}-shell-side`}
            x1="350"
            y1="153"
            x2="438"
            y2="252"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ABB9B6" />
            <stop offset=".5" stopColor="#586B71" />
            <stop offset="1" stopColor="#172B33" />
          </linearGradient>
          <linearGradient
            id={`${prefix}-body`}
            x1="241"
            y1="301"
            x2="366"
            y2="438"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F0F0E6" />
            <stop offset=".38" stopColor="#C7CFCA" />
            <stop offset=".79" stopColor="#7A8B8D" />
            <stop offset="1" stopColor="#2B454F" />
          </linearGradient>
          <linearGradient id={`${prefix}-arm`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F2F2E9" />
            <stop offset=".42" stopColor="#C9D2CD" />
            <stop offset="1" stopColor="#4C656C" />
          </linearGradient>
          <linearGradient
            id={`${prefix}-face`}
            x1="230"
            y1="150"
            x2="360"
            y2="268"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#263A41" />
            <stop offset=".35" stopColor="#10202A" />
            <stop offset=".74" stopColor="#07141D" />
            <stop offset="1" stopColor="#122E38" />
          </linearGradient>
          <linearGradient
            id={`${prefix}-visor-edge`}
            x1="200"
            y1="148"
            x2="370"
            y2="269"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#677A7D" />
            <stop offset=".5" stopColor="#10222A" />
            <stop offset="1" stopColor="#A1B8B5" />
          </linearGradient>
          <linearGradient id={`${prefix}-eye`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#D9FFF8" />
            <stop offset=".4" stopColor="#7BFFEA" />
            <stop offset="1" stopColor="#20BCB5" />
          </linearGradient>
          <linearGradient id={`${prefix}-foot`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#D6DED7" />
            <stop offset=".52" stopColor="#899D9D" />
            <stop offset="1" stopColor="#324E58" />
          </linearGradient>
          <radialGradient id={`${prefix}-halo`}>
            <stop stopColor="#53E7D8" stopOpacity=".18" />
            <stop offset=".65" stopColor="#39C3B9" stopOpacity=".04" />
            <stop offset="1" stopColor="#39C3B9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${prefix}-floor`}>
            <stop stopColor="#5DF5E0" stopOpacity=".16" />
            <stop offset="1" stopColor="#5DF5E0" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${prefix}-shine`}
            x1="220"
            y1="157"
            x2="311"
            y2="253"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity=".13" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter
            id={`${prefix}-glow`}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter
            id={`${prefix}-soft-glow`}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter
            id={`${prefix}-shadow`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <ellipse cx="300" cy="270" rx="247" ry="234" fill={paint("halo")} />
        <g className="robot-platform">
          <ellipse cx="300" cy="512" rx="214" ry="53" fill={paint("floor")} />
          <ellipse
            cx="300"
            cy="512"
            rx="162"
            ry="34"
            stroke="#63F5E2"
            strokeOpacity=".11"
          />
          <ellipse
            cx="300"
            cy="512"
            rx="138"
            ry="28"
            stroke="#63F5E2"
            strokeOpacity=".35"
            strokeWidth="1.2"
          />
          <ellipse
            cx="300"
            cy="512"
            rx="115"
            ry="23"
            stroke="#63F5E2"
            strokeOpacity=".1"
          />
          <path
            d="M166 505c14-14 71-23 134-23 64 0 118 10 134 24M219 537c24 5 52 7 81 7"
            stroke="#8CFFF0"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M166 505c14-14 71-23 134-23 64 0 118 10 134 24"
            stroke="#63F5E2"
            strokeWidth="5"
            filter={paint("glow")}
          />
          <ellipse
            className="robot-shadow"
            cx="300"
            cy="504"
            rx="70"
            ry="12"
            fill="#02090D"
            opacity=".8"
            filter={paint("shadow")}
          />
          <path
            d="M300 474v8M300 542v8M133 512h13M454 512h13"
            stroke="#63F5E2"
            strokeOpacity=".45"
          />
        </g>

        <g className="robot-floating">
          {/* Feet, neck and shoulder joints sit behind the sculpted outer shell. */}
          <path
            d="M255 413l-6 22M338 413l7 22"
            stroke="#152D36"
            strokeWidth="23"
          />
          <path
            d="M246 428c-19 5-30 22-23 32 7 10 33 13 48 6 10-5 13-23 4-31-8-8-19-10-29-7Z"
            fill={paint("foot")}
            stroke="#B0D9D0"
            strokeOpacity=".25"
          />
          <path
            d="M333 429c15-7 35-1 42 14 7 15-13 26-31 25-17-1-24-10-22-21 1-7 5-14 11-18Z"
            fill={paint("foot")}
            stroke="#B0D9D0"
            strokeOpacity=".25"
          />
          <path
            d="M235 459c11 6 24 7 35 2M334 461c11 3 24 0 31-5"
            stroke="#73F7DF"
            strokeOpacity=".55"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g ref={neckRef}>
            <path d="M271 269h61v49h-61z" fill="#102A34" />
            <path d="M272 286h59M273 296h57" stroke="#6C8788" strokeWidth="3" />
          </g>

          <g className="robot-arm-left">
            <ellipse
              cx="222"
              cy="330"
              rx="19"
              ry="24"
              transform="rotate(23 222 330)"
              fill="#16353F"
              stroke="#647E7D"
              strokeWidth="2"
            />
            <path
              d="M211 318c-12 2-18 12-22 27l-14 45c-4 13 0 22 10 25 12 4 20-3 24-17l16-50c5-16-2-31-14-30Z"
              fill={paint("arm")}
            />
            <path
              d="M200 337l-13 46"
              stroke="#F5FAF1"
              strokeOpacity=".6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M175 399c-9 9-13 23-6 31 5 6 10 2 13-3 2 10 9 11 14 5 6-7 10-21 1-30-6-6-15-8-22-3Z"
              fill={paint("foot")}
            />
            <path
              d="M188 410l-6 17"
              stroke="#243F48"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <g className="robot-arm-right">
            <ellipse
              cx="373"
              cy="328"
              rx="19"
              ry="23"
              transform="rotate(-24 373 328)"
              fill="#16353F"
              stroke="#647E7D"
              strokeWidth="2"
            />
            <path
              d="M381 315c9-6 21-1 27 10l16 29c7 12 5 23-5 29-10 6-20 0-26-11l-17-31c-6-11-5-20 5-26Z"
              fill={paint("arm")}
            />
            <path
              d="M390 324l19 33"
              stroke="#F3F8ED"
              strokeOpacity=".65"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <g key={greetingCount} className="robot-forearm">
              <circle
                cx="417"
                cy="370"
                r="14"
                fill="#183640"
                stroke="#76928E"
                strokeWidth="2"
              />
              <path
                d="M409 374c-7-7-6-17 1-26l18-24c7-10 17-12 25-6 8 6 7 17 0 27l-18 24c-8 10-19 12-26 5Z"
                fill={paint("arm")}
              />
              <path
                d="M425 352l13-19"
                stroke="#EFF8EB"
                strokeOpacity=".65"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g className="robot-hand">
                <path
                  d="M432 324c-8-3-12-8-11-13l3-10c1-5 6-7 9-4l3 5 5-19c2-7 9-8 11-2l-1 16 8-15c4-6 10-3 9 3l-7 18 10-9c5-4 10 1 6 7l-16 20c-7 9-20 9-29 3Z"
                  fill={paint("arm")}
                  stroke="#BCD8CF"
                  strokeOpacity=".35"
                />
                <path
                  d="M438 307c6-3 13-1 16 5"
                  stroke="#657E7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>

          <path
            d="M266 301c-20 2-34 16-37 39l-7 48c-4 32 24 54 72 55 48 1 79-19 76-51l-6-49c-3-24-17-39-38-42-19-3-40-3-60 0Z"
            fill={paint("body")}
            stroke="#BDDDD1"
            strokeOpacity=".3"
          />
          <path
            d="M247 321c-7 12-11 27-12 45"
            stroke="#FFFFF2"
            strokeOpacity=".52"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M235 396c15 14 37 20 64 20 23 0 43-4 58-13"
            stroke="#344E55"
            strokeOpacity=".38"
            strokeWidth="1.5"
          />
          <path d="M280 310h35l-3 17h-28l-4-17Z" fill="#263F47" />
          <path
            d="M287 317h19"
            stroke="#63F5E2"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="299"
            cy="366"
            r="22"
            fill="#819694"
            stroke="#D8E5DA"
            strokeWidth="2"
          />
          <circle
            cx="299"
            cy="366"
            r="17"
            fill="#17313A"
            stroke="#3E5A61"
            strokeWidth="3"
          />
          <path d="M300 353l-8 15h8l-3 12 11-17h-9l1-10Z" fill="#6EF3DE" />
          <circle
            cx="299"
            cy="366"
            r="18"
            stroke="#63F5E2"
            strokeWidth="2"
            opacity=".35"
            filter={paint("glow")}
          />
          <path
            d="M277 427h8m5 0h8m5 0h8m5 0h8"
            stroke="#274650"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <g ref={headRef} className="robot-head" transform="rotate(-7 300 209)">
            <path d="M298 116v-29" stroke="#718D8A" strokeWidth="8" />
            <path d="M296 111V87" stroke="#D3E3D6" strokeWidth="2" />
            <circle
              className="robot-antenna-glow"
              cx="298"
              cy="81"
              r="12"
              fill="#63F5E2"
              opacity=".28"
              filter={paint("glow")}
            />
            <circle cx="298" cy="81" r="7" fill="#75F6DB" />
            <circle cx="296" cy="79" r="2" fill="#ECFFF6" />
            <rect
              x="163"
              y="185"
              width="28"
              height="53"
              rx="13"
              fill={paint("shell-side")}
            />
            <path
              d="M170 199v23"
              stroke="#65F4DF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="406"
              y="181"
              width="29"
              height="57"
              rx="14"
              fill={paint("shell-side")}
            />
            <path
              d="M425 197v24"
              stroke="#6FFFF0"
              strokeOpacity=".7"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M226 118c40-8 105-8 145 1 32 7 50 30 52 62l1 48c0 33-22 56-52 63-37 9-106 9-145 1-33-6-53-30-53-62v-46c0-36 17-59 52-67Z"
              fill={paint("shell-side")}
            />
            <path
              d="M222 115c40-8 105-8 145 1 32 7 50 30 52 62l1 48c0 33-22 56-52 63-37 9-106 9-145 1-33-6-53-30-53-62v-46c0-36 17-59 52-67Z"
              fill={paint("shell")}
              stroke="#D4E9DE"
              strokeOpacity=".5"
            />
            <path
              d="M199 139c24-19 103-24 147-15"
              stroke="#FFFFF4"
              strokeOpacity=".65"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M219 149c36-10 114-10 150 1 22 7 31 22 32 43l-1 36c-1 22-13 36-35 42-34 10-110 10-144 0-23-7-35-21-35-43l1-35c0-22 10-37 32-44Z"
              fill={paint("visor-edge")}
            />
            <path
              d="M220 153c36-10 111-10 147 1 21 6 29 20 30 40l-1 33c-1 21-12 33-33 39-33 10-107 10-140 0-22-6-33-19-33-40l1-32c0-20 9-34 29-41Z"
              fill={paint("face")}
              stroke="#0D1D25"
              strokeWidth="2"
            />
            <path
              d="M220 155c32-9 88-10 124-4l-103 119c-8-1-14-3-20-5-20-6-29-18-29-39l1-32c0-19 8-33 27-39Z"
              fill={paint("shine")}
            />
            <path
              d="M214 167c14-9 40-12 64-13"
              stroke="#A2CDC7"
              strokeOpacity=".17"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g className="robot-eye-sockets" fill="#17454C" opacity=".3">
              <rect x="229" y="184" width="43" height="55" rx="21.5" />
              <rect x="319" y="184" width="43" height="55" rx="21.5" />
            </g>
            <g ref={gazeRef} className="robot-gaze">
              <g className="robot-eyes">
                <rect
                  x="240"
                  y="190"
                  width="25"
                  height="43"
                  rx="12.5"
                  fill="#63F5E2"
                  filter={paint("glow")}
                  opacity=".6"
                />
                <rect
                  x="330"
                  y="190"
                  width="25"
                  height="43"
                  rx="12.5"
                  fill="#63F5E2"
                  filter={paint("glow")}
                  opacity=".6"
                />
                <rect
                  x="240"
                  y="190"
                  width="25"
                  height="43"
                  rx="12.5"
                  fill={paint("eye")}
                />
                <rect
                  x="330"
                  y="190"
                  width="25"
                  height="43"
                  rx="12.5"
                  fill={paint("eye")}
                />
                <path
                  d="M247 198v17M337 198v17"
                  stroke="#E4FFF5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity=".65"
                />
              </g>
            </g>
            <path
              className="robot-smile"
              d="M285 246c6 5 15 5 21 0"
              stroke="#63F5E2"
              strokeOpacity=".7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M219 283c42 10 107 9 144 0"
              stroke="#99F2DF"
              strokeOpacity=".5"
              strokeWidth="1.5"
            />
            <circle cx="385" cy="269" r="2" fill="#314C53" />
            <circle cx="204" cy="269" r="2" fill="#647F7E" />
          </g>
        </g>
      </svg>
      <span className="robot-greeting" role="status" aria-live="polite">
        {isWaving && <span key={greetingCount}>Hi!</span>}
      </span>
    </button>
  );
}
