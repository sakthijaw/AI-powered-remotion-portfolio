# Visual Reasoning Architecture

This is an incremental upgrade to the existing three-agent pipeline. It does **not** add a fourth OpenCode specialist subagent. The requested `VisualReasoningAgent` is implemented as a mandatory internal stage owned by `story-production-agent`, because this repository deliberately supports exactly three production subagents.

## Existing pipeline findings

- Intent and Research correctly collect evidence, sources, data, and Tufte visual references.
- Visualization retrieval supplies useful design precedents, but it does not decide how each spoken idea should be explained through motion.
- Storyboarding currently names scenes, assets, charts, icons, captions, and beats, but can drift toward visual nouns: `shield`, `people`, `clock`, `chart`.
- Motion planning often uses generic fades, slides, and scales instead of semantic visual actions.
- The renderer is appropriately mechanical: it executes RenderSpec fields and must not infer story, choose chart types, or invent visual explanations.

The missing semantic layer is between narration planning and storyboard authoring: each narration sentence needs a planned explanatory action before assets and animations are chosen. The canonical order is story -> idea -> visual metaphor -> scene composition -> camera direction -> animation -> assets. Any process that starts with icons, chart panels, stock primitives, or entrance effects is backwards.

## Mandatory internal stage: VisualReasoningAgent

Inside `story-production-agent`, run this stage before storyboarding:

```text
Narration + story context + retrieved Tufte references + scene objective
  -> VisualReasoningAgent internal stage
  -> storyboard, motion/camera/transition plan, RenderSpec
```

Required output per scene:

```json
{
  "sceneGoal": "",
  "coreIdea": "",
  "visualMetaphor": "",
  "visualVerb": "",
  "objects": [],
  "relationships": [],
  "viewerQuestion": "",
  "composition": {
    "backgroundWorld": "",
    "primaryFocus": "",
    "secondarySupport": "",
    "mutedContext": ""
  },
  "cameraBehavior": "",
  "cameraPath": {
    "startFrame": "",
    "focusTarget": "",
    "movement": "",
    "hold": "",
    "exitFrame": ""
  },
  "transitions": [],
  "attentionOrder": [],
  "persistentElements": [],
  "removeElements": [],
  "annotations": [],
  "motionSequence": []
}
```

## Storyboard order

Replace noun-first planning with:

```text
Story beat
  -> Viewer question
  -> Core idea
  -> Visual metaphor
  -> Scene composition
  -> Camera/focus path
  -> Objects and relationships
  -> Motion sequence
  -> Transitions and persistence
  -> Annotations
  -> Asset choices
  -> Rendering fields
```

## Anti-slideshow rules

- Build a stable visual world, then move the viewer's attention through it. Do not reset to a new card for every sentence unless the story needs a deliberate contrast.
- Every scene needs a primary focus, secondary support, and background/muted context. If all objects compete equally, the scene fails.
- Camera/focus/pan/zoom/parallax/reframe beats should clarify sequence, scale, comparison, cause, or synthesis. Generic movement is not enough.
- Avoid independent object entrances. Multiple objects may appear only when the ordering explains causality, accumulation, ranking, comparison, or mechanism.
- Icons and studio primitives are explanatory actors, not decoration. A shield protects or lags; money flows; people accumulate; nodes connect; clocks advance.
- Text behaves like narration: one phrase or sentence at a time, synchronized with the visual change it explains.
- Charts answer a stated viewer question and build progressively before ending on a focused insight annotation.
- Each scene contract must contain exactly one viewer question with one question mark. Multiple questions in one scene split attention and should become separate scenes or be rewritten into one sharper question.
- `animation_actions` must include semantic motion beyond entrance grammar. A list such as `fade in`, `rise text`, and `pop icon` is not direction; it must say what meaning changes, such as `grow comparison bars`, `trace route`, `focus on baseline`, `morph prior chart state`, or `hold final annotation`.
- Adjacent scenes may reuse a visual grammar only when the second scene declares and shows a transformation, contrast, inherited state, or changed question. Otherwise it is a slide replacement, not a documentary sequence.

## Before / after examples

- Before: show a shield icon for governance.  
  After: capability bars grow ahead; a governance shield starts behind and catches up, making lag visible.
- Before: show two document icons for attention.  
  After: word groups split, then connecting traces join distant context tokens.
- Before: show a full timeline.  
  After: the line draws left-to-right; active year pulses; milestone labels appear only when narrated.
- Before: show a static investment number plus a map.  
  After: capital counter counts up, flows along traced paths, and lands in factory/data-center nodes.
- Before: make five icons pop onto a panel.  
  After: hold one composed scene while the camera follows a cause-effect chain from first constraint to final outcome.
