const CHECKLIST_ITEMS = [
  {
    icon: "📍",
    title: "Name the place clearly",
    body: "Give an intersection, a landmark, or a gate number — not just a neighbourhood. People who have never been there should be able to find it with no extra research.",
  },
  {
    icon: "🛠️",
    title: "Say exactly what people will do",
    body: "\"Clean the riverbank\" is a start. \"Pick up plastic bags and sort by type\" is a task. Specific descriptions attract volunteers who know they can help.",
  },
  {
    icon: "👥",
    title: "Set an honest capacity",
    body: "Too many people at a small site creates chaos. Too few makes the work feel lonely. A good rule: one volunteer per 2–3 metres of working area.",
  },
  {
    icon: "🧤",
    title: "List what to bring",
    body: "Gloves, closed shoes, a water bottle, an old t-shirt. Mention what you provide on the day so people know what they don't need to carry.",
  },
  {
    icon: "📞",
    title: "Tell the caretaker",
    body: "If you are working at a public site — a lake bank, a school, a park — let the caretaker or ward office know in advance. It avoids confusion and sometimes unlocks help.",
  },
];

export function OrganiserChecklist() {
  return (
    <aside
      className="rounded-none border border-rule bg-surface p-5"
      aria-label="Before you post checklist"
    >
      <p className="t-label text-brand-ink">Before you post</p>
      <p className="t-small mt-2 text-muted">
        Events that answer these five questions fill faster and run smoother.
      </p>
      <ol className="mt-5 space-y-5" role="list">
        {CHECKLIST_ITEMS.map(({ icon, title, body }) => (
          <li key={title} className="flex gap-3 border-t border-rule pt-5 first:border-t-0 first:pt-0">
            <span className="mt-0.5 text-xl leading-none" aria-hidden="true">
              {icon}
            </span>
            <div>
              <p className="t-h4">{title}</p>
              <p className="t-small mt-1 text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
