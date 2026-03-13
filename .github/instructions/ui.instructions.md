---
description: Read this before implementing or modifying any UI components. This file outlines the rules and best practices for using shadcn/ui as the sole UI component library in this application.
---

# UI Components — shadcn/ui

All UI in this application is built exclusively with **shadcn/ui**. Do not create custom component primitives (buttons, inputs, cards, dialogs, etc.) — always use or extend a shadcn/ui component.

---

## Rules

- **shadcn/ui is the only UI component library.** Never build custom primitives from scratch.
- **Never edit files inside `components/ui/`** — these are shadcn-generated. Wrap or extend them in a new component file outside that directory.
- **Use `cn()` from `@/lib/utils`** for all Tailwind class merging — never string concatenation.
- **Use `lucide-react` for all icons.** No other icon libraries.

---

## Configuration

| Setting         | Value             |
| --------------- | ----------------- |
| Style           | `new-york`        |
| Base color      | `neutral`         |
| CSS variables   | enabled           |
| Icon library    | `lucide-react`    |
| Components path | `@/components/ui` |

---

## Adding a New Component

Use the shadcn CLI to add components. Never copy-paste component source manually.

```bash
npx shadcn@latest add <component-name>
```

Examples:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
```

---

## Usage Pattern

Import directly from the `@/components/ui` alias:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

Compose with `cn()` when adding conditional or extra classes:

```tsx
import { cn } from "@/lib/utils";
<Button
  className={cn("w-full", isLoading && "opacity-50")}
  disabled={isLoading}
>
  Submit
</Button>;
```

---

## Extending Components

If a shadcn component needs repeated customization, wrap it — do not modify the source:

```tsx
// components/submit-button.tsx
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({ className, ...props }: ButtonProps) {
  return <Button className={cn("w-full", className)} {...props} />;
}
```
