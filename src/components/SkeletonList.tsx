import { DSkeleton } from '@dynamic-framework/ui-react';

export default function SkeletonList() {
  return (
    <div className="mt-1">
      <DSkeleton viewBox="0 0 320 260" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
        <rect x="0" y="0" rx="8" ry="8" width="80" height="10" />
        <rect x="0" y="24" rx="8" ry="8" width="320" height="30" />
        <rect x="0" y="64" rx="8" ry="8" width="320" height="30" />
        <rect x="0" y="104" rx="8" ry="8" width="320" height="30" />
        <rect x="0" y="142" rx="8" ry="8" width="320" height="30" />
        <rect x="0" y="180" rx="8" ry="8" width="320" height="30" />
      </DSkeleton>
    </div>
  );
}
