import { useEffect, useRef, useState } from 'react';
import { STATS_CARDS } from '../data/plumbingData';
import {
  TrophyStatIcon,
  CustomersStatIcon,
  ToolsStatIcon,
  ClockStatIcon,
} from './Icons';

interface ParsedStat {
  isNumericCountUp: boolean;
  target: number;
  suffix: string;
  rawValue: string;
}

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^(\d+)(\+?)$/);
  if (!match) {
    return {
      isNumericCountUp: false,
      target: 0,
      suffix: '',
      rawValue: value,
    };
  }
  return {
    isNumericCountUp: true,
    target: Number.parseInt(match[1], 10),
    suffix: match[2] ?? '',
    rawValue: value,
  };
}

const PARSED_STATS = STATS_CARDS.map((stat) => ({
  ...stat,
  parsed: parseStatValue(stat.value),
}));

const ANIMATION_DURATION_MS = 1850;

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const stat of PARSED_STATS) {
      if (stat.parsed.isNumericCountUp) {
        initial[stat.id] = 0;
      }
    }
    return initial;
  });

  useEffect(() => {
    const targetEl = containerRef.current;
    if (!targetEl || hasAnimatedRef.current) return;

    let rafId: number | null = null;

    const setFinalValues = () => {
      const finals: Record<string, number> = {};
      for (const stat of PARSED_STATS) {
        if (stat.parsed.isNumericCountUp) {
          finals[stat.id] = stat.parsed.target;
        }
      }
      setCounts(finals);
    };

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setFinalValues();
        return;
      }

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
        // Ease-out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);

        const nextCounts: Record<string, number> = {};
        for (const stat of PARSED_STATS) {
          if (stat.parsed.isNumericCountUp) {
            nextCounts[stat.id] = Math.round(stat.parsed.target * eased);
          }
        }
        setCounts(nextCounts);

        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
        } else {
          setFinalValues();
        }
      };

      rafId = window.requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            startAnimation();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(targetEl);

    return () => {
      observer.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="bg-[#EBF2E7] pt-4 pb-16 px-5 sm:px-8 lg:px-14">
      <div
        ref={containerRef}
        className="max-w-[1220px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {PARSED_STATS.map((stat) => {
          const displayValue = stat.parsed.isNumericCountUp
            ? `${counts[stat.id] ?? 0}${stat.parsed.suffix}`
            : stat.parsed.rawValue;

          return (
            <div
              key={stat.id}
              className="bg-[#C3D2BA] rounded-[16px] py-9 px-6 text-center shadow-[0_6px_18px_rgba(0,0,0,0.09)] border border-black/5"
            >
              <div className="mb-3">
                {stat.id === 'experience' && <TrophyStatIcon />}
                {stat.id === 'customers' && <CustomersStatIcon />}
                {stat.id === 'projects' && <ToolsStatIcon />}
                {stat.id === 'support' && <ClockStatIcon />}
              </div>
              <div className="text-[32px] font-extrabold text-[#111827] leading-tight tabular-nums">
                {displayValue}
              </div>
              <div className="mt-1.5 text-[13px] text-[#475569] font-medium">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
