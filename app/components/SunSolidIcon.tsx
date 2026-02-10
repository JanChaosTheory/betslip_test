"use client";

/**
 * Sun icon: solid circle center + 8 chunky triangular rays (silhouette style).
 * Matches reference: bold, readable at 14–16px. Color via currentColor/theme.
 */
export function SunSolidIcon({ className }: { className?: string }) {
  const cx = 12;
  const cy = 12;
  const circleR = 5;
  const rayOuter = 11;
  const rayDegStep = 45;
  const halfDeg = rayDegStep / 2;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden
    >
      <circle cx={cx} cy={cy} r={circleR} />
      {Array.from({ length: 8 }, (_, i) => {
        const midDeg = i * rayDegStep - 90;
        const tipX = cx + rayOuter * Math.cos(toRad(midDeg));
        const tipY = cy + rayOuter * Math.sin(toRad(midDeg));
        const baseLeftX = cx + circleR * Math.cos(toRad(midDeg - halfDeg));
        const baseLeftY = cy + circleR * Math.sin(toRad(midDeg - halfDeg));
        const baseRightX = cx + circleR * Math.cos(toRad(midDeg + halfDeg));
        const baseRightY = cy + circleR * Math.sin(toRad(midDeg + halfDeg));
        return (
          <polygon
            key={i}
            points={`${tipX},${tipY} ${baseLeftX},${baseLeftY} ${baseRightX},${baseRightY}`}
          />
        );
      })}
    </svg>
  );
}
