# Mission: Game design documentation that holds a project's vector

## Why

The user runs **CrystallEdge** (a.k.a. CrystallPunk 14), an open-source fantasy roleplay
co-op game built on the SS14 / RobustToolbox stack. The core loop is already playable.
For two years every design doc format they tried has been abandoned: nobody read them,
they went stale, they were expensive to maintain, and they never actually stopped
off-vector content from landing. The user wants a documentation practice that (1) works
as a personal thinking tool for making and keeping design decisions, and (2) lets a
crowd of GitHub contributors tell on their own whether an idea fits the game, without
the user hand-adjudicating every pull request.

## Success looks like

- CrystallEdge has a one-page vision doc and a small set of design pillars that the user
  can defend, and that fit on a single screen each.
- A running **decision log** (ADR-style, append-only) lives in the game repo; each entry
  is written once in ~15 minutes and never revisited.
- A contributor with a feature idea can open the docs, find the relevant pillar or
  decision, and answer "does this fit?" before opening a PR.
- The user can point to a specific pillar or decision number when accepting or rejecting
  a contribution, instead of arguing from taste.
- Six months on, the docs are still accurate because they record past decisions, not a
  moving description of the game.

## Constraints

- Solo lead, volunteer contributors, coordination happens on GitHub (issues + PRs).
- Docs currently live in an mkdocs site (`crystallpunk-docs` repo). Willing to move
  decision records into the game repo itself if that keeps them alive.
- Low time budget for doc upkeep: anything that needs periodic "syncing" with the code
  will be abandoned again.
- Prefers practical and terse over comprehensive. Has read/written many GDD formats already.

## Out of scope

- Narrative / lore bible writing (worldbuilding as prose).
- Marketing one-sheets, pitch decks, publisher-facing docs.
- Task tracking and roadmapping (that is what GitHub issues are for).
- Technical/architecture documentation of the codebase.
