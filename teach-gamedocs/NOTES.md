# Working notes

## About the learner

- **TheShuEd**, lead and author of **CrystallEdge / CrystallPunk 14**: OSS fantasy RP
  co-op game on the SS14 / RobustToolbox stack. Core loop playable.
- **Concept:** roguelike whose protagonist is not one player but an "island" carrying a
  city of dozens of players, split by roles (engineers, thaumaturge scholars, innkeepers,
  adventurers, guards, ...). The island/city is the hero; players run it.
- Already has an mkdocs site (`crystallpunk-docs`) with: a Design Pillars page
  (Complexity, Variability, Sociality, Depth of Simulation) and an 8-point new-mechanic
  checklist, plus a visual-style decision and technical docs.
- Two years of trying GDD formats; all abandoned. Diagnosed pains (from intake):
  nobody read them, didn't hold the vector, expensive to maintain, too abstract.
- **Momentum:** ~4000 in the Discord, but interest peaked long ago and fell after
  several concept reworks. **Zero active contributors right now** (were dozens). So the
  docs are, for now, almost purely a personal thinking tool; the contributor-vector
  function is for when contributors return (and is part of winning them back).
- Wants docs as (a) a personal thinking tool and (b) a self-serve fit-check for
  contributors. Coordination is GitHub-only. Not recording decisions anywhere yet,
  currently just studying the practice.

## Teaching preferences

- Terminal replies: terse. A UserPromptSubmit hook enables "caveman mode" (drop
  filler). Keep chat lean. **Deliverables (lessons, references, MISSION etc.) stay in
  full, careful prose** — they are the product and get reread.
- Prefers practical and concise over exhaustive. Do not re-explain GDD basics.
- Responds in Russian; comfortable reading English resources. Lessons: write in Russian
  for body text, keep English technical terms (pillar, decision record, RFC) as-is.
  (First lesson shipped in Russian.)

## Thread of the course (working plan, revise freely)

1. ✅ The decision record — the doc format that doesn't rot. (lesson 0001)
2. ✅ **The plan** — 7-step roadmap, source-backed, delivered on his explicit request.
   (lesson 0002) Steps: 0 set up `/docs/decisions/` + D-0000; 1 backfill F1-F6 +
   invariant + setting decision as records; 2 one-page vision (Librande); 3 pillars as
   lenses + anti-pillars; 4 **solve F1** (the real one, design work); 5 one-in-one-out
   rule; 6 RFC issue template (deferred, no contributors).
3. Backfilling F1-F6 as records — hands-on, walk through 1-2 with him, he does the rest.
4. The one-page vision — Librande-style, "what this is NOT" from F1-F6.
5. Pillars as judgement lenses with anti-pillars. Raw material on the mkdocs site.
6. **F1 design help** — if he wants, run 2-3 progression directions against the pillars.
   Not doc teaching per se, but it is the gating decision for CE4 and he may ask.
7. Superseding and pruning — tie to the five concept rewrites.
8. Docs next to code — when a YAML prototype / folder README beats a prose page.

Next expected input: his D-0000 file + `/docs/decisions/` structure (Step 0).

## Resolved

- User is TheShuEd, the lead. ✔
- Contributors right now: zero (were dozens). ✔ -> lean thinking-tool framing.
- Decision-record location: undecided, user "just studying" for now. Revisit when he
  actually starts a log; still leaning game repo `/docs/decisions/`.

## Misconception surfaced (see LR-0002)

User read lesson 0001 as "you never describe the gameplay foundation," found that
strange. Correct: the foundation IS written down, once, in the one-page **vision**
layer (~1 paragraph). The decision-log approach kills the 40-page describe-everything
GDD, not the premise. His D-0001 ("academy owns city progression") is a borderline
case: he recorded a *decision* as if it were *premise*, which is why writing it felt
wrong and why his gut flagged "no alternatives considered."

## Open questions

- Community: does the user want communities surfaced at all? Not yet asked.
- Does he want to keep the existing 8-point mechanic checklist, fold it into pillars,
  or retire it? Ask during the pillars lesson.

## Pacing / emotional context (important)

Game design is a sore subject for the user: two years of abandoned docs, "mood sours"
when the topic comes up, "a lot of negative experience." Keep sessions short, do not
stack homework, do not be relentlessly upbeat. Reframe the failures as a bad *format*
(describe-everything, keep-it-current, solo) rather than a personal shortcoming. Let
him set the pace; give explicit permission to stop.

**Escalated (2026-09-10):** he stated directly he has "completely lost confidence as a
game designer," is tired, but believes quitting after 2 years would "finally break me"
and end game dev, which was his passion. Do not paper over this. Acknowledge plainly,
briefly, no therapy voice, no cheerleading. The honest, non-flattering reframe he can
actually use: the five pivots were a search with a consistent objective function, each
driven by a specific playtest finding, not flailing. The confidence damage came largely
from the lossy medium (every rewrite deleted the evidence) making one converging
investigation feel like five failures. See concept-history.md.

## Concept history CE1 -> CE4 (see concept-history.md)

User disclosed the full pivot chain: CE1 (SS14 + D&D, adventurers 80% of players,
resource cycle) -> CE2 (delete adventurers, magopunk city only) -> CE3 (delete
everything but adventurers, multiplayer roguelike, 4-player parties) -> pullback from a
standalone-Steam idea -> CE4 (magopunk island IS the roguelike protagonist, ~50 players
coordinate to run it). Six playtest findings F1-F6 + one invariant (wants a big
multiplayer social server he feeds with content). F1 (roles mandatory-for-progression +
rote work = misery) is still UNSOLVED and is exactly what D-0001 trips over. Written up
in concept-history.md with a table showing CE4 as the composition of all findings.
Recommended these become the first decision-log entries ("rejected direction" type).

## Surfaced design principles (belong in his eventual decision log, not here)

- **"Hard dependencies are bad; a round must be playable even when a given role is
  entirely absent."** Discussed with contributors previously, never recorded. This is
  pillar- or foundational-decision material. It *contradicts* his D-0001 draft
  ("academy owns city progression" = a hard dependency) unless progression is
  non-essential to a round. Good live example of two design tools catching each other.

## The lost back-catalog — MINED (see salvage-from-git-history.md)

Dug through `crystallpunk-docs` git history at his request. Findings written up in
[salvage-from-git-history.md](salvage-from-git-history.md). Headlines:

- **Three global rewrites** wiped successive design docs: `6d0373e` 2025-12-03
  "goodbye old design docs", `c7252a8` 2026-01-30 "another global rewrite",
  `056f91c` 2026-08-11 "remove old crap" (−864 lines / 35 files).
- **The concept itself pivoted** and it was never recorded: the deleted `Питч.md`
  (alive until 2026-08-11) describes parallel 4-player teams in a procedural
  "labyrinth of dimensions" with classes and ~1h runs — a different game from today's
  flying-island-city. Old pitch just deleted, no superseding decision.
- His own deleted `Принятые неотсортированные решения.md` opens: "a place to store
  accepted decisions, but no doc architecture devised to store them adequately." He
  built the decision log twice, informally, and deleted it twice.
- **8 items triaged as still-live** (S1-S8 in the salvage file). Recommended: 5 become
  decision records (one-directional resource flows; no hard role dependencies; "no
  communism"; PvE = tutorial-only; round frame), 1-2 go to vision/pillars (the
  "collapsing sandcastle" round philosophy), 2 stay as reference (faction-system
  charter; race-design rules). Rest left in git history.
- **D-0001 verdict:** "academy owns progression" contradicts S2 (no hard deps) and S7
  (mechanics available to all, role = advantage only). Not ready until reconciled.
