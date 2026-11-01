import { Skeleton } from "@/components/ui/states";

export default function Loading() {
  return <main className="py-16"><div className="shell"><Skeleton className="h-12 w-2/3" /><div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <Skeleton className="aspect-[4/3]" key={index} />)}</div></div></main>;
}
