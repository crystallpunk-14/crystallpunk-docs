# Mission established; documentation strategy reframed from "describe" to "decide"

The user has abandoned every descriptive GDD format over two years. Intake pinned the
four failure modes: nobody read them, they did not hold the project vector, they were
expensive to maintain, they were too abstract to act on. Mission set: documentation
that works as (a) a personal thinking tool and (b) a self-serve fit-check for GitHub
contributors, without the lead adjudicating every PR by taste. See [[MISSION.md]].

The reframing the course is built on: stop producing documents that *describe the game*
(a moving target, so they rot) and start producing a small set of *decision-shaped*
artifacts — a one-page vision, pillars that can say "no", and an append-only decision
log (ADR-style) living in the game repo. This directly maps onto all four of the user's
stated pains, which is why lesson 0001 leads with the decision record rather than with
vision or pillars.

## Prior knowledge established

- Has already written pillars for CrystallEdge (Complexity, Variability, Sociality,
  Depth of Simulation) plus an 8-point new-mechanic checklist, and a visual-style
  decision doc. So "what is a pillar" is known; the gap is making pillars *operational*
  (able to reject things) and keeping a decision history.
- Comfortable with GitHub issues/PRs as the coordination surface. No separate wiki
  culture to fight.
- Has tried "many GDD formats" — treat GDD fundamentals as known; do not re-teach.

## Implications for next sessions

- Lesson 0002 candidate: rewriting the existing CrystallEdge pillars as judgement
  lenses with explicit anti-pillars ("this means we do NOT ..."). The raw material
  already exists on their mkdocs site, so this is editing, not greenfield.
- Do not spend a lesson selling "why not a big GDD" — they are already convinced,
  they just lacked a replacement.
- Confirm whether decision records go in the game repo or the docs repo before the
  RFC-pipeline lesson; the answer changes the issue-template work.
- Waiting on a real D-0001 draft from the user as the first skills-feedback loop.
