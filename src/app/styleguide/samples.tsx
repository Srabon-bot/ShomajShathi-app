"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { Chip, CountChip, TypeDot } from "@/components/ui/chip";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete event
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this event?"
        description="“Winter Clothes Drive — Mirpur 10” and everyone's place on it will be removed. This cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep event
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false);
                toast.success("Event deleted");
              }}
            >
              Delete event
            </Button>
          </>
        }
      />
    </>
  );
}

export function TabsDemo() {
  const [value, setValue] = useState("all");

  return (
    <Tabs
      value={value}
      onChange={setValue}
      items={[
        { value: "all", label: "All", count: 8 },
        { value: "published", label: "Published", count: 7 },
        { value: "past", label: "Past", count: 1 },
      ]}
    />
  );
}

export function ChipsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>Cleanup</Chip>
      <Chip selected>Plantation</Chip>
      <TypeDot type="Donation" />
      <CountChip>12 left</CountChip>
      <CountChip full>Full</CountChip>
    </div>
  );
}

export function FormDemo() {
  return (
    <div className="grid max-w-xl gap-6">
      <Field
        label="Event title"
        htmlFor="sg-title"
        required
        hint="What a volunteer would search for."
      >
        <Input id="sg-title" placeholder="Plant 200 saplings — Hatirjheel" />
      </Field>

      <Field
        label="Location"
        htmlFor="sg-location"
        error="Where should people meet?"
      >
        <Input id="sg-location" invalid defaultValue="" placeholder="Mirpur 10 Roundabout" />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Type" htmlFor="sg-type">
          <Select id="sg-type" defaultValue="Cleanup">
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
            <option value="Education">Education</option>
          </Select>
        </Field>

        <Field label="Capacity" htmlFor="sg-capacity">
          <Input id="sg-capacity" type="number" defaultValue={60} />
        </Field>
      </div>

      <Field label="Description" htmlFor="sg-description">
        <Textarea
          id="sg-description"
          rows={3}
          placeholder="What happens on the day, in plain sentences."
        />
      </Field>

      <Checkbox label="This event is free and open to anyone who signs up." defaultChecked />
    </div>
  );
}
