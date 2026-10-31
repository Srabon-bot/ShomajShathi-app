export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="t-label flex items-center gap-2 text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="t-h2 mt-3">{title}</h1>
        {description && <p className="t-lead mt-3 max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-mono text-3xl font-semibold tracking-tight">{value}</p>
      <p className="t-small text-muted">{label}</p>
    </div>
  );
}
