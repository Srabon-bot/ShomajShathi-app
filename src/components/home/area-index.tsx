import Link from "next/link";

const areas = [
  "Mirpur",
  "Mohammadpur",
  "Dhanmondi",
  "Old Dhaka",
  "Hatirjheel",
  "Uttara",
  "Tejgaon",
  "Jatrabari",
  "Rayer Bazar",
  "Kamrangirchar",
  "Shahbagh",
  "Gulshan",
  "Lalmatia",
  "Buriganga",
];

export function AreaIndex() {
  return (
    <section
      className="border-b border-rule bg-[#FFF5D6] py-14 dark:bg-[#29291D]"
      id="where-we-work"
      aria-label="Areas we work in"
    >
      <div className="shell">
        <p className="t-label text-brand">Where we work</p>
        <h2 className="t-h2 mt-4 max-w-lg text-[#0B0B0B] dark:text-[#EAE4D5]">
          Dhaka neighbourhoods we have been to.
        </h2>
        <p className="t-small mt-4 max-w-xl text-[#0B0B0B]/80 dark:text-[#EAE4D5]/75">
          Every chip searches the events list for that area. Click one to see every cleanup,
          plantation, donation or education event near you.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {areas.map((area) => (
            <Link
              key={area}
              href={`/events?q=${encodeURIComponent(area)}`}
              className="inline-flex min-h-10 items-center border border-black bg-white px-4 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white dark:border-[#777044] dark:bg-[#1C1D16] dark:text-[#F0E94A] dark:hover:bg-[#F0E94A] dark:hover:text-[#11120E]"
            >
              {area}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
