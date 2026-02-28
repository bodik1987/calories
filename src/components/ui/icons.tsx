export function ShopingListIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}

export function CheckedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" />
      <circle cx="12" cy="12" r="12" className="fill-accent" />
      <path
        className="stroke-white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m7.198 12.06 3.161 3.162 6.443-6.444"
      />
    </svg>
  );
}

export function UncheckedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" />
      <circle cx="12" cy="12" r="12" fill="none" />
      <circle
        cx="12"
        cy="12"
        r="11"
        className="stroke-accent"
        strokeWidth="2"
      />
    </svg>
  );
}

export function NoDataIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="87.105"
      fill="none"
      className="ml-3"
    >
      <path
        fill="#014c76"
        fillRule="evenodd"
        d="M111.54 37.6c-1.4 16.73-12.2 49.5-52.99 49.5-18.99 0-28.58-4.07-38.34-10.81C9.02 68.57 0 53.67 0 37.6 0 19.98 25.51 9.58 53.67 9.58c15.06 0 30.85 2.18 43.25 9.22l-5.01 5.21s-12.09-8.02-38.24-8.02c-27.87 0-46.43 12.2-46.43 21.61 0 11.85 29.35 19.17 55.85 19.17 26.49 0 40.31-12.78 48.45-19.17Z"
      />
      <path
        fill="#014c76"
        fillRule="evenodd"
        d="M97.77 41.34c-.36-1.89 2.79-7.83 10.04-14.57L126.7 7.81c4.1-3.54-2.3-10.98-8.5-6.33-6.2 4.66-14.78 17.38-21.88 24.59-1.74 1.89-3.46 3.14-8.86 4.36-5.41 1.22-10.23 3.19-14.72 7.82-4.49 4.64-6.66 9.62-6.66 12.59 6.62.07 21.92-2.7 31.69-9.5Z"
      />
    </svg>
  );
}

export function AppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" />
      <g fillRule="evenodd">
        <path
          className="fill-accent"
          d="M10.98 20.166c7.647 0 9.673-6.143 9.934-9.28-1.525 1.198-4.117 3.594-9.085 3.594-4.967 0-10.47-1.372-10.47-3.594 0-1.765 3.479-4.053 8.706-4.053 4.902 0 7.17 1.504 7.17 1.504l.939-.977c-2.326-1.32-5.286-1.728-8.11-1.728C4.785 5.632 0 7.58 0 10.886c0 3.012 1.692 5.806 3.79 7.254 1.83 1.263 3.628 2.026 7.19 2.026"
        />
        <path
          className="fill-[#90bd84]"
          d="M7.059 8.628c1.802-1.257 6.925-.806 8.902.3-3.533.818-4.491 3.39-4.587 4.48 0 0-1.115.04-3.17-.186-2.054-.225-4.536-1.075-5.084-2.248-.29-.621.232-1.26.964-1.725.65-.412 1.464-.852 2.022-.852-.246.177-1.352.566-1.352 1.488s1.052 1.47 1.72 1.66c-.464-.259-1.217-1.66.585-2.917"
        />
        <path
          className="fill-accent"
          d="M20.216 8.854c-1.36 1.265-1.951 2.377-1.883 2.732-1.832 1.275-4.701 1.795-5.941 1.782 0-.558.405-1.491 1.248-2.36.842-.87 1.745-1.24 2.759-1.468 1.014-.23 1.335-.462 1.662-.816 1.33-1.352 2.94-3.738 4.102-4.611s2.362.523 1.595 1.186z"
        />
      </g>
    </svg>
  );
}

export function FavoriteIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`${
        active ? "fill-warning" : "fill-transparent stroke-warning"
      }`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
export function ChewronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function MeasurementsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

export function BackspaceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
      <path d="m12 9 6 6" />
      <path d="m18 9-6 6" />
    </svg>
  );
}

export function DownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function NetworkOnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

export function NetworkOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" />
      <path d="M8 16H3v5" />
      <path d="M3 12C3 9.51 4 7.26 5.64 5.64" />
      <path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" />
      <path d="M21 12c0 1-.16 1.97-.47 2.87" />
      <path d="M21 3v5h-5" />
      <path d="M22 22 2 2" />
    </svg>
  );
}

export function DotsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
