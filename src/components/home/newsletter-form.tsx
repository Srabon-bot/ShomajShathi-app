"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

/**
 * Design only. Nothing is stored, so the copy must not promise a subscription
 * that does not exist.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        toast.success("You're on the list", {
          description: "One email a month, no more.",
        });
        setEmail("");
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex-1 border-b border-rule-soft pb-2 focus-within:border-brand">
        <Input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <Button type="submit">Keep me posted</Button>
    </form>
  );
}
