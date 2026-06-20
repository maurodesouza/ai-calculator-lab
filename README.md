# AI Calculator Lab

A simple calculator application built as a controlled experiment to evaluate how AI behaves in a structured development environment.

## Objectives

- Understand how AI interprets instructions and follows predefined rules.
- Evaluate consistency across state management, event handling, and UI behavior.
- Improve prompt design and AI-driven development workflows.

## Scope

- Basic arithmetic: addition, subtraction, multiplication, division.
- Clickable buttons and keyboard input support.
- Light/dark theme switch.
- Display for current input and results.
- Responsive and accessible experience.

## Tech Stack

- TanStack Start
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod

## Development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run test
```

## Architecture Notes

- All UI components follow a headless, primitive composition model.
- Communication between UI and state uses an event-based pub/sub pattern.
- Styling is token-driven via the `base-*`, `tone`, and `palette-*` context layers.
