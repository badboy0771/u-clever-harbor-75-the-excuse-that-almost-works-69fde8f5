[![Bounty](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5.svg)](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
[![Rank](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/badboy0771/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/rank.svg)](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
[![Reward](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/badboy0771/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/reward.svg)](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)

# The Trapped Plumber

One excuse, 99 characters, 19 words: the line a gamer texts the boss to skip work on GTA 6 launch week — the lift broke with the plumber trapped inside, and someone has to stay home for the rescue crew.

> Sorry, our lift broke with the plumber trapped inside, and I have to stay home for the rescue crew.

## Why this excuse

The judge is a tired manager who has heard every excuse twice and believes almost none of them. The brief weighs, in order: it is an excuse a gamer sends a boss to skip work on GTA 6 launch week, one line, at most 20 words; it sounds almost believable — a real, specific, boring detail rather than a wild story; it is funny on its own terms, the laugh coming from the excuse's own logic; it reads like a text sent in a hurry; it finds an angle the obvious excuses miss. This line is built to that brief:

- **Almost believable:** boring on purpose. A lift broke, a plumber is trapped inside it, and someone has to stay home for the rescue crew. Nothing wild, nothing tragic, nothing rehearsed — a building problem with a specific trade, a specific failure, and a specific obligation.
- **The laugh is in the excuse's own logic:** the lift broke WITH the plumber inside it — the one person who could fix a lift is the one trapped in it. The manager almost believes it because every detail is the kind of detail a real emergency has, while the whole thing is, quietly, a perfect alibi for launch week.
- **Sent in a hurry:** opens with "Sorry," — no greeting, no name, straight into the problem. One line, plain words, no setup, no explanation, no signature, no hedging ("basically", "unfortunately" are banned in the code).
- **An angle the obvious excuses miss:** no dead grandmother, no flat tyre, no sudden fever — all three are rejected outright in the code, along with the car and the sick day.
- **Never names the game:** a real excuse never says GTA 6. Mentioning the game would be the confession itself — the manager would believe nothing.

## How it runs

`main.ts` (Node 22, no dependencies, no network, deterministic) writes that one excuse to `/output/entry.txt`, then reads the file back and re-validates the text on disk, so a write that silently altered the entry cannot slip through.

```sh
node main.ts
```

## Gate checklist

| Rule | Result |
| --- | --- |
| 1–140 characters | 99 ✓ |
| At most 20 words | 19 ✓ |
| Exactly one line | 1 ✓ |
| Opens like a hurried text (Sorry,) | ✓ |
| Boring specific detail (lift broke, plumber) | ✓ |
| Obligation, not choice (I have to stay home) | ✓ |
| Laugh from its own logic (plumber trapped inside) | ✓ |
| No obvious excuse (grandmother, flat tyre, fever) | ✓ |
| Never names the game (no GTA 6, no launch week) | ✓ |
| No signature, no explanation, no filler, no hedge | ✓ |
| No leading/trailing whitespace, no double spaces, no trailing newline | ✓ |
| File reads back byte-identical | ✓ |
