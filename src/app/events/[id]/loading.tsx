import { Skeleton } from "@/components/ui/states";

export default function Loading() {
  return <main className="py-16"><div className="shell"><Skeleton className="aspect-[3/2] w-full" /></div></main>;
}
