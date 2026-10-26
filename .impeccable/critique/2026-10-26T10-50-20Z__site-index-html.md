---
target: homepage site/index.html
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/lecalbar/site/index.html"
target_fingerprint: "sha256:609cfe85e9d5f30f47925afceb47dbe90b575d42bad28f72fcf01fadb10f66db"
target_path: /home/user/lecalbar/site/index.html
timestamp: 2026-10-26T10-50-20Z
slug: site-index-html
---
Method: dual-agent (A: design review · B: detector + browser)

# Critique — site/index.html (Le Calbar)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | #form-status always gold for info/error/success; pre-filled "pas encore disponible" |
| 2 | Match System / Real World | 3 | Heading swap says "réservation" though it is a request; Drinks & Food / Carte / Menus naming drift |
| 3 | User Control and Freedom | 3 | data-request heading swap never resets on select change |
| 4 | Consistency and Standards | 2 | Two 01–03 numbering systems; Fatwash/Fat wash/« Fatwash »; two golds (#c6a568, #c6a15b); no mobile section nav |
| 5 | Error Prevention | 2 | Mon/Sun accepted until submit; no arrival time; table guests max 200; required fields unmarked |
| 6 | Recognition Rather Than Recall | 2 | Hours/closed days ~7,800px above the form, not repeated |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Filler values grid; long inline menu pushes form to bottom |
| 9 | Error Recovery | 2 | Native bubbles only; phone in error text not a tel: link |
| 10 | Help and Documentation | n/a | Marketing page |
| **Total** | | **19/32** | **Acceptable (59%)** |

## Design Specificity Verdict
LLM: frame is category template (dark + gold, system Georgia/Arial, tracked-caps eyebrows, 01/02/03, same "Statement.<br><i>gold italic</i>" h2 formula x7, generic luxury copy). Specific assets: illustrated cocktail menu, Savoir-faire tabs with real photos/recipes, workshop facts. Signature (bartenders in boxer shorts + bow tie) appears in one sentence in #paris only; hero video shows a floral shirt.
Detector: 35 CLI warnings — overused-font x7 (Arial, no chosen face), italic-serif-display x6, extreme-negative-tracking x6 (false positive: clamp unresolved, real ≈ -0.024em), cramped-padding x4 (false positives), numbered-section-labels x3, hero-eyebrow-chip x2, tiny-text x2, wide-tracking x2, undersized-ui-text x1 (10px mobile eyebrow real), kicker-above-heading x1, all-caps-body x1 (cocktails.html). Browser overlay: 19 on home desktop (adds straggler x6, heading-rhythm on #evenements/#agency/#savoir-faire), 8 on mobile; 404 assets/atelier-cocktails.webp. No horizontal overflow, no JS errors.

## Priority Issues
1. [P1] Signature identity hidden behind generic luxury copy. Fix: lead hero with the calbar/caleçon idea and real imagery of the outfit; replace values grid with concrete proof (clarification, fat wash, since 2012); borrow the menu's illustration language. Commands: /impeccable bolder, /impeccable clarify.
2. [P1] Reservation path buried (form at ~8,773px desktop / ~14,900px mobile, after B2B Agency); table CTA not primary; no arrival time. Fix: reorder Hero → Infos → Menu preview → Savoir-faire → Réserver → Ateliers → Évent → Agency; primary table CTA; arrival-time select for table; hours/address/tel button beside the form. Command: /impeccable layout.
3. [P1] Form states/copy fragile: heading says "réservation", not reset on select change; status same gold for errors; native-only validation; Mon/Sun only on submit; phone not tappable; no reply-time promise. Command: /impeccable harden.
4. [P2] Mobile Réserver goes gold-on-gold after tap: `nav a:hover` (style.css) outranks `.shortcut-reserve{color:#0e0e0e}`; no @media (hover:hover). Command: /impeccable polish.
5. [P2] Template-grade typography/system: system fonts, repeated heading formula, two numbering systems, two golds. Command: /impeccable typeset.

## Persona Red Flags
- Tourist at Gare de Lyon at 21:00: no open-now signal, no walk-in policy, no walking time; only path is an email request; phone is a muted line.
- Jordan: never learns what "Calbar" means; nav leads with internal names L'Évent / Agency.
- Casey: 6 targets on first mobile screen with duplicates; Réserver unreadable after tap; menu ≈ 9 screens; no mobile section nav.
- Riley: Monday rejected only on submit; stale "atelier" heading; table for 200 accepted; broken atelier image; obsolete /paris.html footer link.

## Minor Observations
Header bleed-through (rgba .94); Téléphone (facultatif) misaligned with Email; goo.gl Itinéraire link; missing atelier-cocktails.webp; stragglers; locale-dependent date placeholder; small tap targets on footer and inline tel/email links; leftover id "carbon".

## Questions to Consider
1. Why is the boxer-shorts identity only one sentence deep? What if the name's joke led the page?
2. Does the full inline menu persuade booking, or push the form 9 mobile screens away?
3. Should Agency (B2B) live on the same scroll as a tourist looking for a drink tonight?
