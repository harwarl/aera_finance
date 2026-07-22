"use client";

import { useState } from "react";
import { User, Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CornerBrackets } from "@/components/shared/CornerBrackets";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 border border-accent/40 bg-background-elevated/50 px-5 py-4 font-mono text-xs uppercase tracking-widest text-accent">
        <Check className="h-4 w-4 shrink-0" />
        You&apos;re on the list{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-3 border border-border bg-background-elevated/40 px-4 py-3 transition-colors focus-within:border-accent">
        <User className="h-4 w-4 shrink-0 text-foreground-faint" />
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Full name"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-faint focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-border bg-background-elevated/40 px-4 py-3 transition-colors focus-within:border-accent">
        <Mail className="h-4 w-4 shrink-0 text-foreground-faint" />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-faint focus:outline-none"
        />
      </div>

      <CornerBrackets className="mt-2">
        <Button type="submit" className="w-full">
          Join Waitlist
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CornerBrackets>
    </form>
  );
}
