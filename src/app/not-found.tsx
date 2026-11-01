import Link from "next/link";
import { EmptyState } from "@/components/ui/states";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60svh] items-center justify-center py-16">
      <EmptyState
        className="w-full max-w-xl"
        title="This page isn't here"
        description="The event may have ended, or the link is wrong. The list of what is coming up is still where you left it."
        action={
          <Link href="/events" className={cn(buttonVariants())}>
            Back to events
          </Link>
        }
      />
    </div>
  );
}
