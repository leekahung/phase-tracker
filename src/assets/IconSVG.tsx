interface Props {
  svgPathDef: string;
  svgClassName: string;
  svgStrokeSize: number;
  additionalPathDef?: string;
}

/**
 * The `IconSVG` component is a component that includes both the svg element and
 * the svg path with input `svgPathDef` being defined by a string
 */
function IconSVG({
  svgPathDef,
  svgClassName,
  svgStrokeSize,
  additionalPathDef,
}: Props): React.JSX.Element {
  return (
    <svg
      className={svgClassName}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={String(svgStrokeSize)}
        d={svgPathDef}
      />
      {additionalPathDef !== undefined && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={String(svgStrokeSize)}
          d={additionalPathDef}
        />
      )}
    </svg>
  );
}

export default IconSVG;
