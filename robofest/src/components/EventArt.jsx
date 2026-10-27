import { useId } from "react";

/** Decorative engineering sketches, drawn specifically for the event cards. */
export default function EventArt({ type = "war" }) {
  const id = useId().replace(/:/g, "");
  const accent =
    type === "race" ? "#B8A2FF" : type === "thon" ? "#F3BD75" : "#71EFDC";
  const fill = (name) => `url(#${id}-${name})`;

  return (
    <svg
      className="event-art-svg"
      viewBox="0 0 420 240"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-top`} x1=".15" y1="0" x2=".85" y2="1">
          <stop stopColor="#52646B" />
          <stop offset="1" stopColor="#26353D" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#283A44" />
          <stop offset="1" stopColor="#101B24" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#B0BDB9" />
          <stop offset=".4" stopColor="#6B7D81" />
          <stop offset="1" stopColor="#253941" />
        </linearGradient>
        <linearGradient id={`${id}-tire`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#26343D" />
          <stop offset="1" stopColor="#080F16" />
        </linearGradient>
        <radialGradient id={`${id}-aura`}>
          <stop stopColor={accent} stopOpacity=".1" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter
          id={`${id}-glow`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <pattern
          id={`${id}-grid`}
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
          patternTransform="matrix(1 .42 -1 .42 210 38)"
        >
          <path
            d="M44 0H0v44"
            stroke="#748B92"
            strokeOpacity=".12"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <ellipse cx="220" cy="131" rx="183" ry="111" fill={fill("aura")} />
      <path
        d="M0 130 210 36 420 130 210 240Z"
        fill={fill("grid")}
        opacity=".7"
      />
      <path d="M38 163 210 236 382 163" stroke={accent} strokeOpacity=".06" />

      {type === "war" && (
        <g>
          <ellipse
            cx="218"
            cy="180"
            rx="125"
            ry="32"
            fill="#03090D"
            opacity=".55"
          />
          {/* The far caterpillar track and its raised tread blocks. */}
          <path
            d="m226 65 20-11c8-4 17-3 25 2l73 43c12 7 17 18 13 29l-6 13c-4 8-13 10-23 5l-95-56c-11-6-14-18-7-25Z"
            fill={fill("tire")}
            stroke="#40525B"
          />
          <path
            d="m244 63 95 56"
            stroke="#4B6068"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => (
            <path
              key={step}
              d={`m${242 + step * 12} ${57 + step * 7} -6 13`}
              stroke="#14232C"
              strokeWidth="4"
            />
          ))}
          {/* A low, armored wedge with an inset top plate. */}
          <path
            d="m125 105 109-40 96 55-111 50Z"
            fill={fill("top")}
            stroke="#657A7E"
            strokeWidth="1.2"
          />
          <path
            d="m125 105 94 65v34l-94-56Z"
            fill={fill("side")}
            stroke="#263E48"
          />
          <path
            d="m219 170 111-50v34l-111 50Z"
            fill="#172832"
            stroke="#344B53"
          />
          <path
            d="m142 105 91-32 77 45-91 40Z"
            fill="#34464D"
            stroke="#758B8A"
            strokeOpacity=".5"
          />
          <path
            d="m163 107 67-23 53 31-66 28Z"
            fill="#1B2B34"
            stroke="#536B70"
          />
          <path d="m174 108 55-19 10 6-55 20Z" fill={accent} fillOpacity=".7" />
          <path d="m194 121 54-20 8 5-53 22Z" fill="#4B626A" />
          <path d="m210 131 50-19" stroke="#71898B" strokeWidth="2" />
          <path d="m248 165 54-24v11l-54 24Z" fill="#07141C" />
          <path
            d="m251 168 5-2m5-2 5-2m5-2 5-2m5-2 5-2m5-2 5-2"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Near track: individually machined treads catch the rim light. */}
          <path
            d="m103 113 13-7c7-4 15-1 23 4l85 49c12 7 16 19 11 29l-5 10c-5 9-15 11-25 5l-95-56c-12-7-16-24-7-34Z"
            fill={fill("tire")}
            stroke="#3D525C"
            strokeWidth="1.5"
          />
          <path
            d="m114 127 98 57"
            stroke="#0A151E"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            d="m117 116 100 58"
            stroke="#3B515A"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <path
              key={step}
              d={`m${113 + step * 12} ${110 + step * 7} -5 14`}
              stroke="#12212B"
              strokeWidth="4.5"
            />
          ))}
          {[0, 1, 2, 3, 4].map((step) => (
            <g
              key={step}
              transform={`translate(${118 + step * 23} ${136 + step * 13})`}
            >
              <ellipse
                rx="8"
                ry="10"
                transform="rotate(-27)"
                fill="#344B55"
                stroke="#516A70"
              />
              <ellipse rx="3" ry="4" transform="rotate(-27)" fill="#10212B" />
            </g>
          ))}
          {/* A serrated horizontal combat disc mounted off the front corner. */}
          <path d="m288 143 26-12 18 10-26 13Z" fill={fill("metal")} />
          <ellipse
            cx="329"
            cy="153"
            rx="44"
            ry="24"
            fill="#152B34"
            stroke="#557478"
            strokeWidth="2"
          />
          <g transform="translate(329 149) scale(1 .53)">
            <path
              d="m0-44 8 7 9-4 5 10 10 1 1 10 10 5-4 9 7 7-7 8 4 9-10 5-1 10-10 1-5 10-9-4-8 7-8-7-9 4-5-10-10-1-1-10-10-5 4-9-7-8 7-7-4-9 10-5 1-10 10-1 5-10 9 4Z"
              fill={fill("metal")}
              stroke="#ACC4BE"
              strokeWidth="1.5"
            />
            <circle r="28" fill="#2A4149" stroke="#71938F" strokeWidth="2" />
            <circle
              r="15"
              fill="#142B34"
              stroke={accent}
              strokeOpacity=".65"
              strokeWidth="3"
            />
            <circle r="5" fill={accent} />
            <path
              d="M0-24v7M0 17v7M-24 0h7M17 0h7"
              stroke="#93AAA5"
              strokeWidth="4"
            />
          </g>
          <path
            d="m146 95 4 2m148 18 4 2m-83 39 4 2"
            stroke="#B2C8BF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m79 177 26 15m241-6 21-9"
            stroke={accent}
            strokeOpacity=".5"
            strokeWidth="1.5"
          />
          <path
            d="m73 181 25 15m247-3 25-11"
            stroke={accent}
            strokeOpacity=".18"
          />
        </g>
      )}

      {type === "race" && (
        <g>
          {/* An illuminated racing line sweeps through the isometric floor. */}
          <path
            d="M-19 185c75 59 153 36 151-4-2-36-70-51-27-81 42-29 108 9 160-2 60-12 71-63 163-37"
            stroke="#25303E"
            strokeWidth="34"
          />
          <path
            d="M-19 185c75 59 153 36 151-4-2-36-70-51-27-81 42-29 108 9 160-2 60-12 71-63 163-37"
            stroke={accent}
            strokeOpacity=".18"
            strokeWidth="4"
            filter={fill("glow")}
          />
          <path
            d="M-19 185c75 59 153 36 151-4-2-36-70-51-27-81 42-29 108 9 160-2 60-12 71-63 163-37"
            stroke={accent}
            strokeOpacity=".65"
            strokeWidth="1.6"
          />
          <path
            d="M-18 202c69 44 140 26 159-10M166 105c36 8 65 15 97 9 66-12 80-62 162-36"
            stroke="#C0B8D9"
            strokeOpacity=".22"
            strokeWidth="1.5"
            strokeDasharray="6 9"
          />
          <ellipse
            cx="257"
            cy="159"
            rx="97"
            ry="25"
            fill="#03090D"
            opacity=".6"
          />
          {/* Four chunky wheels with lavender wheel hubs. */}
          <g transform="translate(211 98) rotate(-29)">
            <rect
              x="-19"
              y="-12"
              width="35"
              height="33"
              rx="9"
              fill={fill("tire")}
              stroke="#53616D"
            />
            <path
              d="M-11-10v30M-2-11v31M7-11v31"
              stroke="#0C1721"
              strokeWidth="3"
            />
          </g>
          <g transform="translate(295 113) rotate(-29)">
            <rect
              x="-19"
              y="-12"
              width="35"
              height="33"
              rx="9"
              fill={fill("tire")}
              stroke="#53616D"
            />
            <path
              d="M-11-10v30M-2-11v31M7-11v31"
              stroke="#0C1721"
              strokeWidth="3"
            />
          </g>
          <path
            d="m173 124 62-43 86 48-65 46Z"
            fill={fill("top")}
            stroke="#6C7B87"
          />
          <path
            d="m173 124 83 51v17l-83-50Z"
            fill={fill("side")}
            stroke="#354654"
          />
          <path d="m256 175 65-46v17l-65 46Z" fill="#182532" stroke="#435361" />
          <path
            d="m188 123 48-32 65 37-47 34Z"
            fill="#22313E"
            stroke="#7B83A0"
            strokeOpacity=".65"
          />
          <path
            d="m211 111 17-11 65 37-17 12Z"
            fill={accent}
            fillOpacity=".6"
          />
          <path d="m237 88 7-5 65 37-7 6Z" fill={accent} />
          <path
            d="m189 128 19 11m6 4 15 9"
            stroke="#C2B5EC"
            strokeOpacity=".6"
            strokeWidth="2"
          />
          <path
            d="m220 114 15-10 29 17-15 11Z"
            fill="#0F1B27"
            stroke="#6F6992"
          />
          <path d="m229 115 9-6 17 10-9 6Z" fill="#685E8D" />
          <g transform="translate(189 153) rotate(-29)">
            <rect
              x="-20"
              y="-18"
              width="38"
              height="38"
              rx="10"
              fill={fill("tire")}
              stroke="#526471"
              strokeWidth="1.5"
            />
            <path
              d="M-12-16v34M-2-17v35M8-17v35"
              stroke="#0C1721"
              strokeWidth="3"
            />
            <ellipse
              cx="-20"
              cy="1"
              rx="7"
              ry="13"
              fill="#344253"
              stroke="#718095"
            />
            <ellipse
              cx="-21"
              cy="1"
              rx="3"
              ry="7"
              fill={accent}
              fillOpacity=".65"
            />
          </g>
          <g transform="translate(273 171) rotate(-29)">
            <rect
              x="-20"
              y="-18"
              width="38"
              height="38"
              rx="10"
              fill={fill("tire")}
              stroke="#526471"
              strokeWidth="1.5"
            />
            <path
              d="M-12-16v34M-2-17v35M8-17v35"
              stroke="#0C1721"
              strokeWidth="3"
            />
            <ellipse
              cx="-20"
              cy="1"
              rx="7"
              ry="13"
              fill="#344253"
              stroke="#718095"
            />
            <ellipse
              cx="-21"
              cy="1"
              rx="3"
              ry="7"
              fill={accent}
              fillOpacity=".65"
            />
          </g>
          {/* Front optical sensors and antenna. */}
          <path d="m295 150 18-13v7l-18 13Z" fill={accent} />
          <path
            d="m295 150 18-13"
            stroke={accent}
            strokeWidth="5"
            filter={fill("glow")}
          />
          <path d="M233 98V65" stroke="#91A1AD" strokeWidth="2" />
          <circle cx="233" cy="63" r="3" fill={accent} />
          <path
            d="M225 56c5-4 11-4 16 0M220 50c8-7 18-7 26 0"
            stroke={accent}
            strokeOpacity=".4"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="m133 134 21 12m-32-5 20 12m-6 4 12 7"
            stroke={accent}
            strokeOpacity=".3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="m341 108 12-8m1 10 12-8"
            stroke={accent}
            strokeOpacity=".5"
            strokeWidth="1.5"
          />
        </g>
      )}

      {type === "thon" && (
        <g>
          <ellipse
            cx="222"
            cy="188"
            rx="121"
            ry="29"
            fill="#03090D"
            opacity=".55"
          />
          {/* Workstation plinth and rotary actuator. */}
          <path
            d="m133 172 75-31 82 38-78 35Z"
            fill={fill("top")}
            stroke="#6A777B"
          />
          <path
            d="m133 172 79 42v10l-79-41Z"
            fill={fill("side")}
            stroke="#34454D"
          />
          <path d="m212 214 78-35v11l-78 34Z" fill="#15242D" stroke="#34454D" />
          <path
            d="m143 173 64-26 71 32-66 29Z"
            stroke={accent}
            strokeOpacity=".3"
          />
          <path
            d="M177 160h62v23c0 10-62 10-62 0Z"
            fill={fill("side")}
            stroke="#52666D"
          />
          <ellipse
            cx="208"
            cy="160"
            rx="31"
            ry="13"
            fill={fill("metal")}
            stroke="#91A29F"
          />
          <ellipse
            cx="208"
            cy="160"
            rx="21"
            ry="8"
            fill="#293D46"
            stroke={accent}
            strokeOpacity=".6"
          />
          <path
            d="M179 181c14 7 43 7 57 0"
            stroke={accent}
            strokeOpacity=".7"
            strokeWidth="2"
          />
          {/* Hydraulic lower arm and exposed cable follow the joint chain. */}
          <path
            d="M207 155 176 114"
            stroke="#091720"
            strokeWidth="31"
            strokeLinecap="round"
          />
          <path
            d="M208 153 178 112"
            stroke={fill("metal")}
            strokeWidth="23"
            strokeLinecap="round"
          />
          <path
            d="m207 147-23-31"
            stroke="#A6B6B1"
            strokeOpacity=".5"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M199 158c-33-13-48-39-31-54"
            stroke="#0D1C26"
            strokeWidth="6"
          />
          <path
            d="M199 158c-33-13-48-39-31-54"
            stroke={accent}
            strokeOpacity=".7"
            strokeWidth="1.5"
          />
          <circle
            cx="178"
            cy="109"
            r="20"
            fill="#273A44"
            stroke="#8A9F9D"
            strokeWidth="2"
          />
          <circle
            cx="178"
            cy="109"
            r="12"
            fill="#172832"
            stroke={accent}
            strokeOpacity=".7"
            strokeWidth="2"
          />
          <circle cx="178" cy="109" r="4" fill={accent} />
          <path
            d="m190 100 48-38 14 17-48 39Z"
            fill={fill("top")}
            stroke="#859793"
            strokeWidth="1.5"
          />
          <path
            d="m204 118 48-39v12l-44 35Z"
            fill={fill("side")}
            stroke="#3D525B"
          />
          <path
            d="m200 100 33-25"
            stroke={accent}
            strokeOpacity=".65"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m205 110 33-25"
            stroke="#9BABA6"
            strokeOpacity=".3"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="247"
            cy="72"
            r="17"
            fill={fill("metal")}
            stroke="#A4B1A9"
          />
          <circle
            cx="247"
            cy="72"
            r="10"
            fill="#233640"
            stroke={accent}
            strokeOpacity=".8"
          />
          <circle cx="247" cy="72" r="3" fill={accent} />
          <path
            d="m257 76 32 28-12 14-33-29Z"
            fill={fill("top")}
            stroke="#829893"
          />
          <path
            d="m257 80 23 20"
            stroke="#ADBAAF"
            strokeOpacity=".45"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m278 115 11-11 10 9-12 11Z"
            fill={fill("metal")}
            stroke="#A9B6AC"
          />
          {/* Open two-finger gripper precisely places an illuminated cube. */}
          <path
            d="m289 118-4 16 10 8m3-31 16 7-2 13"
            stroke="#76908F"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="m289 118-4 16 10 8m3-31 16 7-2 13"
            stroke="#C0CBC0"
            strokeOpacity=".4"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m289 145 16-7 17 9-17 8Z"
            fill={accent}
            fillOpacity=".5"
            stroke={accent}
          />
          <path
            d="m289 145 16 10v19l-16-10Z"
            fill={accent}
            fillOpacity=".12"
            stroke={accent}
            strokeOpacity=".7"
          />
          <path
            d="m305 155 17-8v19l-17 8Z"
            fill={accent}
            fillOpacity=".22"
            stroke={accent}
            strokeOpacity=".7"
          />
          <ellipse
            cx="305"
            cy="184"
            rx="27"
            ry="9"
            stroke={accent}
            strokeOpacity=".3"
            strokeDasharray="3 4"
          />
          <path
            d="M305 174v6"
            stroke={accent}
            strokeOpacity=".5"
            strokeDasharray="2 2"
          />
          {/* Floating circuit panel: geometric code marks, no baked-in text. */}
          <path
            d="m94 63 54 19v53l-54-20Z"
            fill="#18252D"
            fillOpacity=".8"
            stroke={accent}
            strokeOpacity=".35"
          />
          <path
            d="m102 76 8 3m5 2 22 8m-35-2 14 5m5 2 9 3m-28 1 6 2m5 2 24 9m-35 0 15 5"
            stroke={accent}
            strokeOpacity=".6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="m95 121 16 6M99 129l28 10"
            stroke={accent}
            strokeOpacity=".2"
          />
          <path d="m337 61 9-4 9 5-9 4Z" fill={accent} fillOpacity=".5" />
          <path
            d="m337 61 9 5v10l-9-5Zm9 5 9-4v10l-9 4Z"
            stroke={accent}
            strokeOpacity=".5"
          />
          <path d="m334 94 6-3 7 4-6 3Z" fill={accent} fillOpacity=".25" />
          <path
            d="M328 83h-8m4-4v8M115 162h-8m4-4v8"
            stroke={accent}
            strokeOpacity=".45"
          />
          <path
            d="m165 197 11 6m5 3 6 3"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
