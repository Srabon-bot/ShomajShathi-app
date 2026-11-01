import { AuthMark } from "./auth-mark";

/**
 * The auth pages are the plainest in the product: white, one huge caps title,
 * underline fields, one black button. No split photograph.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell relative max-w-2xl py-16 md:py-24">
      {children}
      <AuthMark className="mt-16 size-6 text-foreground" />
    </div>
  );
}
