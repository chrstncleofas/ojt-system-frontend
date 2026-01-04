Purpose
-------
Guidance for the Copilot assistant when making changes to the frontend React + TypeScript project.

High-level rules (follow always)
- Inspect `src/` (pages, components, services, dtos) before implementing changes. Understand data flow from `services/api.ts` and `student.service`.
- Keep code clean and consistent with existing patterns (Tailwind utility classes, Lucide icons, DTO mappings). Use explicit types and update `dtos/` when necessary.
- Use `pnpm` for commands. Do not commit `.env.local` or secrets.

UX & structure rules
- Preserve API contracts used by the app (`/students/register`, `/auth/login`, etc.). If you change payload shape, update `dtos/student.dto.ts` and corresponding backend contract.
- Favor small UI changes; keep responsive Tailwind utility classes consistent (use existing breakpoints and grid patterns).

Code-change guidelines
- Add inputs, validation, or handlers following existing patterns in `StudentRegister.tsx` (state, `handleChange`, `validateForm`).
- When adding fields, update `StudentRegistrationDTO` in `src/dtos/student.dto.ts` to keep types in sync.
- Add unit or integration tests if the change affects logic (optional but preferred).

Dev & verification steps
- Type check: `pnpm exec tsc --noEmit`.
- Start dev server: `pnpm start`.
- Build: `pnpm build` and ensure the production build compiles.
- Lint with ESLint if configured.

Commit & PR
- Make focused commits with clear messages. Update README if you change setup or env requirements.

If unsure
- Ask before changing API payloads, DB-mapped field names, or shared DTO/interface contracts.
