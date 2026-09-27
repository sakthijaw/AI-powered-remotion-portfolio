# Production Requirements

Requirements as stated by the user, in the order they were raised, with implementation status
as of 2026-07-31. Verbatim quotes are marked; everything else paraphrases the stated intent.

**Status key:** ✅ enforced · ⚠️ partial · ❌ not enforced · 🔧 requires agent behaviour (not
mechanically enforceable)

---

## R0. Environment

The production harness is **Codex**, not OpenCode.

This matters concretely: Codex reads `~/.codex/config.toml` and does **not** read `.opencode/`.
Agent prompt files under `.opencode/agents/` do reach the subagents (confirmed empirically — the
CES research log contained fields that exist only in the updated prompt), but MCP server
registration must live in the Codex config.

The repository's `AGENTS.md` and `README.md` still describe OpenCode as "the runtime
architecture". That documentation has not been rewritten for Codex.

---

## R1. Data source — Data Commons

Data for a video run comes from Data Commons, retrieved in real time from the user's prompt.

| Requirement | Status |
| --- | --- |
| Data Commons is the primary provider | ✅ |
| Real-time retrieval, not cache-first | ✅ cache demoted to cross-check |
| Fallback permitted but never silent | ✅ `data_provider_fallback` required |
| No constant/placeholder measures | ✅ variance gate |

**Registration (Codex):** `[mcp_servers.datacommons]` in `~/.codex/config.toml`, bridging the
remote streamable-HTTP server to stdio via `mcp-remote`, spawned as `node.exe` + `proxy.js`.

Verified end-to-end: `initialize` → *DC MCP Server 1.3.0*; `tools/list` → six tools
(`search_indicators`, `search_child_indicators`, `get_variable_metadata`, `get_observations`,
`get_child_observations`, `get_multi_entity_observations`).

Two operational notes:

- The server **requires** reading `skill://data-commons-researcher/SKILL.md` before the first
  `search_indicators` call.
- `${VAR}` substitution does **not** work in `mcp-remote --header`; the key is stored literally.
  `mcp-remote` also logs headers to stderr, so the key appears in Codex MCP logs. Rotate
  periodically.

---

## R2. Research agent flow

> Research agent get the user prompt (input).
> It search the data from data common tool to retrive a real time based on user prompt.
> Once it finalize the data, then the agent see for tufte skill reference to create a visuals.
> The agent retrives most suitable reference from tufte skill.

A strict three-stage order, no interleaving:

1. **Intake** — the user prompt is the sole statement of intent.
2. **Data first** — retrieve real-time data from Data Commons and *finalize it* before proceeding.
3. **Visual reference second** — only then select the most suitable Tufte skill reference, chosen
   to fit the finalized data.

**Status: ✅** Implemented as `## Mandatory Retrieval Order` in the research agent prompt, with a
ranked selection procedure in `## Tufte Reference Selection`.

The ordering is the point: selecting a visual form before the data is final produces a form the
data cannot honestly fill — the failure mode where charts get bound to invented placeholder
measures.

Also closed here: `applied_rules[]` is now required on every returned reference. The validator has
always required it for RenderSpec 1.5+, but the agent was never told to produce it.

---

## R3. Pictorial pipeline (stated twice, verbatim)

> after data from datacommons.
> First it should generate bar charts/ any visuals from reference of tufte skills reference.
> Once visual are generated, caputure a screenshot and give to imagegen skill of codex.
> The imagegen tool need to convert that captured image into semantic entities/iconic
> pictographics entities as image.
> Then, that generated Image is convert into .html file (for pixel accurate) and it is shown in
> the final rendered video.

| # | Step | Status |
| --- | --- | --- |
| 1 | Data from Data Commons | ✅ |
| 2 | Generate bar charts / visuals from Tufte skill reference | ✅ `prepare-tufte-baselines` |
| 3 | Capture screenshot | ✅ `screenshot-tufte-baselines` |
| 4 | Give screenshot to Codex ImageGen | 🔧 agent-invoked, now attestation-enforced |
| 5 | ImageGen → semantic / iconic pictographic entities | 🔧 depends on step 4 |
| 6 | That image → `.html` (pixel accurate) | ✅ authored by the LLM |
| 7 | That HTML shown in the final rendered video | ✅ `html` layer |

Step 4 cannot be invoked by any script — Codex ImageGen is an agent tool. Enforcement therefore
makes a skipped call *detectable* rather than impossible (see R4).

---

## R4. ImageGen — Codex only

> imagegen use only codex ImageGen tool not anyothers. remove unwanted tools for imagegen.
> Make pipeline strong.

**Status: ✅**

Removed:

- the `procedural` materialization mode, which locally synthesised a single hardcoded SVG whose
  hue was a hash of the subject string — six distinct "semantic" subjects once shipped as one
  hue-swapped hill shape;
- the dead `makeProceduralSvg` helper.

`semantic_asset_requests[].materialization` now accepts only `imagegen` (Codex) and `repo-asset`
(a committed asset). A repo-wide audit found no other image generators referenced anywhere.

**Anti-forgery checks** — because the generator cannot be observed running:

| Check | Catches |
| --- | --- |
| `imagegen_provenance.tool` must equal `codex-imagegen` | any other generator being named |
| `input_screenshot_sha256` must equal this run's baseline screenshot | stale / unrelated reference images |
| reference ≠ baseline sha256 | no redesign happened |
| reference ≠ reconstruction sha256 | the reference is a copy of the reconstruction's own render |
| HTML must not embed the ImageGen/baseline bitmap or `data:image` | pasting instead of reconstructing |

Deliberately **not** implemented: pixel forensics guessing "model output vs browser screenshot"
from colour statistics. Iconic pictographs are flat by design, so such a heuristic would reject
legitimate output. A false-positive gate is worse than no gate here.

---

## R5. Display path — LLM writes the HTML, not Remotion

> image to html should be done by llm not remotion. and prepare a video

**Status: ✅**

- Story (the LLM) authors `reconstruction_html_path` by hand from the Codex ImageGen reference.
- `render-reconstruction-previews.mjs` no longer generates that HTML — it previously **overwrote**
  whatever Story wrote. It now requires the authored file and only screenshots it, failing with
  `reconstruction_html_blocked` if absent.
- The new `html` layer renders that exact document in an iframe, in the video, in the same
  Chromium that screenshots it for QA.

Conformance is therefore proven by **identity** (`html_path` must equal the validated
`reconstruction_html_path`) plus a region-paint check, replacing a whole-frame RMSE diff that
compared a composited video frame against a bare reference plate and could never pass.

*Not yet delivered: a finished production video. That requires a real Codex ImageGen call.*

---

## R6. Total runtime

> The finished video must be no shorter than 60 seconds and no longer than 120 seconds, end to
> end, narration included. This is a hard constraint on `render.duration_seconds` [...] Before
> finalizing the artifact, sum every scene's duration plus every transition's duration and confirm
> the total falls inside this range. If the arc as written runs short, add depth to the comparison
> or insight scenes rather than looping filler. If it runs long, cut a claim or merge two scenes
> rather than speeding up pacing to fit.

**Status: ✅** for the numeric constraint, 🔧 for the editorial guidance.

Enforced on **both** quantities, in **both** validators:

- `render.duration_seconds` ∈ [60, 120]
- `sceneDurationSum + transitionDurationSum` ∈ [60, 120]

Plus: arc durations must sum to the authored total; scenes must be contiguous with no gaps;
`render.duration_seconds` must equal the last scene's end.

**Version gate.** These rules are gated on RenderSpec 1.7, and Story self-declares the version, so
declaring 1.6 silently opted out of all of them at once. A customer-facing run
(`production_notes.profile: cinematic-explainer-no-audio`) below 1.7 is now blocked at production
time with `renderspec_version_blocked`; `--allow-legacy-renderspec` permits a deliberate legacy
re-render and warns.

"Add depth rather than filler" / "cut a claim rather than speed pacing" are authoring judgment
and live in the agent prompts, not in a validator.

---

## R7. Scene-by-scene arc with time budget

| Phase | Budget | Enforced |
| --- | --- | --- |
| Hook | 5–10s | ✅ |
| Question | 5–10s | ✅ |
| Context | 10–15s | ✅ |
| Evidence | 15–25s | ✅ |
| Comparison | 15–25s | ✅ |
| Insight | 10–15s | ✅ |
| Conclusion | 10–15s | ✅ |
| Final Takeaway | 5–10s | ✅ |

Declared via `production_notes.arc_budget[]`; phase order, per-phase bands, scene coverage and a
`narrative_job` per phase are all validated.

Scene intent per phase — Hook opens on the requested topic and states stakes; Question poses the
specific question; Context gives minimum background; Evidence builds the primary visual;
Comparison sets it against something familiar; Insight delivers the "aha" unhedged; Conclusion
answers the hook question; Final Takeaway leaves one line plus sources — is 🔧 agent behaviour.

**Adoption:** only two specs in the repository have ever carried an `arc_budget`. Of 25 archived
runs, 13 fall inside 60–120s and 12 fall short (as low as 19.5s), because `arc_budget` is
1.7-gated and most runs predate it.

---

## R8. Continuity between scenes

> Every scene boundary in this arc must satisfy the existing rule: the prior scene's takeaway
> plants the question the next scene answers. Do not treat these as eight isolated slides; treat
> the whole runtime as one continuous argument with checkpoints.

> Comparison [...] using the visual carried forward from the Evidence scene, not a new unrelated
> one.

| Rule | Status |
| --- | --- |
| Prior takeaway plants next question | ⚠️ lexical only |
| Comparison carries the Evidence visual forward | ❌ not enforced |

The continuity check requires connective language via regex and rejects a scene repeating the
previous `main_insight` or `viewer_takeaway`. It does not verify that scene *N*'s takeaway
actually sets up scene *N+1*'s question — a scene can pass with connective words and no real
linkage.

**Known conflict.** `validate-story-quality.mjs` penalises a repeated visual pattern across
consecutive scenes unless justification language is present. R8 *requires* Comparison to reuse the
Evidence visual. The two rules push in opposite directions at that boundary: correct behaviour is
currently tolerated by accident of vocabulary rather than recognised as correct.

---

## Open items

1. **Comparison-carries-Evidence-visual** — not enforced (R8).
2. **Takeaway-plants-next-question** — lexical, not semantic (R8).
3. **Repeated-visual-pattern conflict** — resolve against R8's carry-forward requirement.
4. **No production video yet** — the chain needs one real Codex ImageGen call to complete.
5. **Docs describe OpenCode** — `AGENTS.md` / `README.md` not rewritten for Codex (R0).
6. **`DC_API_KEY` rotation** — key is plaintext in `.env` and `config.toml`, and is logged to
   stderr by `mcp-remote`.
7. **`reconstructionHtmlFromManifest`** in `lib/reconstruction-manifest.mjs` is now unused.
