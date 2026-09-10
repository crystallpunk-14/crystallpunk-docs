# Game Design Documentation Resources

## Knowledge

- [Article: "Death of the Game Design Document" (MCV/DEVELOP)](https://mcvuk.com/development-news/death-of-the-game-design-document/)
  The case against the monolithic descriptive GDD: it describes a moving target, so it
  rots, and teams stop opening it. Argues for small, living, visual documents. Use for:
  why past formats failed, framing the shift from description to decision.

- [Talk: Stone Librande, "One-Page Designs" (GDC 2010)](https://archive.org/details/one-page-designs-gdc-2010)
  ([slides](http://stonetronix.com/gdc-2010/OnePageDesigns.ppt), [GDC Vault](https://gdcvault.com/play/1012356/One-Page))
  Canonical, still-cited 15 years on. Long GDDs and wikis go unread and break the
  relationships between elements; replace them with a single annotated diagram/poster
  that fits one page. Use for: the shape of the vision doc, why "one page" is a hard
  constraint not a nicety.

- [Post: Michael Nygard, "Documenting Architecture Decisions" (2011)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
  The original lightweight ADR. "No one reads large documents, but not knowing the
  rationale behind decisions leads to disastrous consequences when later decisions
  defeat earlier ones." Format: Title, Context, Decision, Status, Consequences; stored
  numbered in the repo as Markdown. Use for: the decision-record format and the exact
  argument that fits the user's five silent concept rewrites.

- [Talk/series: Mark Rosewater, "Twenty Years, Twenty Lessons" (GDC 2016)](https://magic.wizards.com/en/news/making-magic/twenty-years-twenty-lessons-part-1-2016-05-30)
  30-year head designer of Magic: The Gathering. Time-tested lessons: "Restrictions
  breed creativity"; "In order to know what to put into your game, you have to
  understand what you want to come out"; "If everyone likes your game but no one loves
  it, it will fail"; "Don't confuse interesting with fun". Use for: vision guardrails,
  why a sharp "what this is NOT" list is a feature, why recorded constraints help.

- [Article: Mark Rosewater, "Ten Things Every Game Needs" (2011)](https://magic.wizards.com/en/news/making-magic/ten-things-every-game-needs-part-1-part-2-2011-12-19)
  Companion checklist to the twenty lessons. Use for: sanity-checking a pillar set
  against fundamentals (goals, obstacles, surprise, catch-up, inertia).

- [Reference: adr.github.io — Architectural Decision Records homepage](https://adr.github.io/)
  Canonical hub for the ADR idea: one record per decision, capturing context, the
  decision, and consequences; concise; focused on *why*. Links to templates (Nygard,
  MADR). Use for: the decision-record format and its rules.

- [Guide: AWS Prescriptive Guidance — ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)
  Practical lifecycle: proposed -> accepted -> superseded, never edited after acceptance.
  Use for: status field, supersession, keeping records append-only and cheap.

- [Article: "How to Make Architecture Decisions: RFCs, ADRs, and Getting Everyone Aligned" (ITNEXT / Lukas Niessen)](https://itnext.io/how-to-make-architecture-decisions-rfcs-adrs-and-getting-everyone-aligned-ab82e5384d2f)
  Clean split: RFC proposes and gathers feedback, ADR records the decision that came out.
  Use for: the propose-then-record pipeline that fits GitHub issues + PRs.

- [Article: "Tech Design at Riot" (Riot Games Technology)](https://technology.riotgames.com/news/tech-design-riot)
  "Highly aligned, highly autonomous" via a public RFC process, explicitly modelled on
  Python PEPs. Use for: evidence that a decision-log culture scales to many contributors
  without a gatekeeper reading everything.

- [Guide: "Game Design Pillars: What Are They and How to Practically Apply Them" (Game Design Skills)](https://gamedesignskills.com/game-design/design-pillars/)
  Pillars as the lens every feature is judged through; 3 to 5; about player *feeling*,
  not tasks; avoid empty words. Use for: writing and stress-testing CrystallEdge pillars.

- [Article: "How pillars and triangles can focus your game design" (Raspberry Pi Foundation)](https://www.raspberrypi.com/news/how-pillars-and-triangles-can-focus-your-game-design/)
  Short, concrete treatment of pillars as a focusing constraint and how to use them to
  say no. Use for: the "anti-pillar / this means we don't" technique.

- [Reference: SS14 "Core Design" (Space Wizards Development Wiki)](https://docs.spacestation14.com/en/space-station-14/core-design.html)
  How the upstream project states its design intent for contributors. Use for: house
  style CrystallEdge contributors already expect; a baseline to diverge from deliberately.

- [Thread: "Wizden Core Design Pillars Rewrite" (SS14 Forum)](https://forum.spacestation14.com/t/wizden-core-design-pillars-rewrite/26937)
  A real pillars rewrite argued in the open on the parent project. Use for: seeing how
  pillar wording gets contested and revised in an OSS game community.

## Wisdom (Communities)

- [r/gamedesign](https://reddit.com/r/gamedesign)
  Moderated against low-effort posts. Use for: critique of a pillar set or vision
  statement, "is this doc doing its job" questions.

- [SS14 / CrystallEdge Discord — #design-discussion](https://docs.spacestation14.com/)
  The room where SS14-lineage design gets debated. Use for: whether a decision record
  reads clearly to the contributors who will actually be bound by it.

- Community preference: not yet stated. Ask before leaning on communities in a lesson.

## Gaps

- No strong single source yet on decision records applied specifically to *game* design
  (as opposed to software architecture). Lessons currently adapt the software ADR
  literature. Worth a deeper search: talks from Klei, Supergiant, or Paradox on how they
  record design intent for modders/contributors.
- No source yet on documentation that lives *next to code/data* in a game repo (YAML
  prototypes, in-folder READMEs) as a rot-resistant alternative to prose.
