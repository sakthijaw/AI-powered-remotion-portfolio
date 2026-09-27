# Visual Knowledge Library

This reusable knowledge base maps abstract concepts to visual metaphors and visual verbs. It is used by the Story & Production Agent's internal VisualReasoningAgent stage before storyboard authoring.

Use this library only after the story beat and viewer question are clear. The production order is story -> idea -> visual metaphor -> scene composition -> camera direction -> animation -> assets. It is invalid to start from an icon, stock asset, or chart template and then search for a story to justify it.

## Canonical visual verbs

- grow
- expand
- merge
- split
- connect
- trace
- compare
- reveal
- highlight
- collapse
- scatter
- stack
- flow
- count
- transform
- zoom
- pan
- morph
- pulse
- protect
- lag
- converge
- accumulate

## Visual Options, Not Defaults

The table below is a vocabulary of possibilities, not a template selector. Use it only after the
story beat, viewer question, data relationship, and evidence are clear. A conventional chart is valid
when it is the clearest explanation; a semantic visual is preferred when the subject can be understood
more directly through recognizable entities, places, flows, mechanisms, or environments.

| Relationship | Possible visual explanations | Useful verbs | Notes |
| --- | --- | --- | --- |
| Growth | repeated semantic units accumulating, infrastructure filling, a line or area when trend shape matters | grow, count, reveal | Choose the form that makes the unit and rate clear. |
| Connection | routes, wires, supply chains, relationship networks, linked annotations | connect, trace, merge | Lines should draw from cause/source to effect/target. |
| Attention | gaze paths, focus regions, highlighted dependencies, spotlighted evidence | connect, highlight, trace | Show what attends to what; do not use a lone symbol as proof. |
| Scaling | unit fields multiplying into the real-world subject | grow, stack, expand | Let the counted thing carry the magnitude when possible. |
| Distribution | maps, swarms, ranked unit fields, scatter plots when position encodes two real measures | scatter, reveal, compare | Reveal spread before labeling outliers. |
| Infrastructure | domain-specific facilities, pipes, roads, grids, servers, ports, hospitals, schools | connect, flow, expand | Make investment or demand visibly become capacity. |
| Investment | capital moving into the domain object it changes | flow, count, accumulate | Counter plus flow beats clarify mechanism when a number is the hook. |
| Risk | exposed people/assets, widening gaps, thresholds, protective layers failing or catching up | split, widen, pulse | Use honest baselines and labels near evidence. |
| Governance | safeguards, rules, institutions, review gates, enforcement lag | protect, lag, converge | The protective visual must participate in an action. |
| Comparison | aligned semantic entities, split states, maps, small multiples, bars only when direct magnitude comparison is clearest | compare, align, highlight | Keep scales honest and common where possible. |
| Timeline | moving entities along a time spine, milestones, line chart when continuous trajectory matters | trace, reveal, pan | Never show fully drawn at scene start. |
| Cause and effect | mechanism diagrams, chains, flows, branching outcomes | trigger, flow, connect | Sequence beats with narration. |
| Threshold | gauges, crossed boundaries, visible reference lines, environmental state shifts | converge, cross, highlight | Explain the threshold explicitly. |
| Feedback loop | circular process with changing state, returns, amplifiers, dampers | cycle, return, amplify | Avoid decorative loops; label feedback. |

## Generated Semantic Assets

Generated bitmaps are valid HTML-compatible assets when Story has requested them through
`production_notes.semantic_asset_requests[]` and Rendering has staged them under
`public/package/generated/semantic/<prompt_slug>/`. Vector conversion is optional and should only be
used when the source is genuinely vector-safe. A generated asset must have a semantic subject,
visual purpose, animation affordances, style group, and source/claim bindings; otherwise it is
decorative and should be rejected.

## Icon policy

Icons are props, not explanations. Each icon must be attached to a visual verb: people multiply, shield protects or lags, money flows, clock advances, GPU connects, database grows, server fills.

Icons should behave as actors inside one composition. Avoid one-by-one decorative entrances unless the order itself communicates sequence, causality, accumulation, ranking, or comparison.

## Chart policy

Charts are one visual option, not the default shape of data. Use a chart when scale, trend, ranking, distribution, uncertainty, or comparison is clearest through chart geometry. When the subject is better explained through semantic entities, environments, mechanisms, maps, or flows, use those instead and record the rejected default chart in the information design brief.

Charts should answer one question and build progressively: axes -> grid -> data -> label -> highlight -> annotation -> camera/focus. State or imply the viewer question before the chart is complete, then end with a focus/annotation that answers it. A fully formed chart that merely appears is a failed scene.

If a later chart uses the same visual grammar as the previous scene, it must visibly transform the existing state, contrast against it, or answer a different stated question. Swapping values into the same finished chart layout is slide behavior, not visual reasoning.

## Camera and composition policy

- Begin each scene with a stable visual world: background context, primary focus, secondary support, and negative space.
- Use camera/focus/pan/zoom/parallax/reframe to guide comprehension through that world instead of replacing everything like a slide deck.
- Camera motion must reveal scale, follow sequence, compare regions, focus on an annotation/outlier, or pull back to synthesize.
- Keep persistent anchors when they preserve the viewer's mental model across scenes.
- Use smooth continuity rather than flicker: do not blink, strobe, rapidly hide/show, repeatedly re-reveal the same target, or animate opacity on whole scenes/regions. Once an element is introduced, keep it stable and shift attention with highlight, trace, camera/focus, annotation, or progressive sublayer construction.
