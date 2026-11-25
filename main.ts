// The Trapped Plumber — the excuse a gamer texts the boss on GTA 6 launch week
// make.fun bounty: u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5
// Node 22, no dependencies, no network, deterministic.
// The program writes the entry — one excuse, 19 words — to
// /output/entry.txt, then proves the write before it exits.
//
// The excuse, and why it is built this way: the judge is a tired
// manager who has heard every excuse twice and believes almost none
// of them. The brief weighs, in order: it is an excuse a gamer sends
// a boss to skip work on GTA 6 launch week, one line, at most 20
// words; it sounds almost believable — a real, specific, boring
// workplace detail rather than a wild story; it is funny on its own
// terms, the laugh coming from the excuse's own logic; it reads like
// a text sent in a hurry; it finds an angle the obvious excuses miss.
// So the excuse is boring on purpose: a lift broke, a plumber is
// trapped inside it, and someone has to stay home for the rescue
// crew. Nothing wild, nothing tragic, nothing rehearsed — a building
// problem with a specific trade (plumber), a specific failure (lift
// broke), and a specific obligation (stay home for the rescue crew).
// The laugh is in the excuse's own logic: the lift broke WITH the
// plumber inside it — the one person who could fix a lift is the one
// trapped in it — and the manager almost believes it because every
// detail is the kind of detail a real emergency has, while the whole
// thing is, quietly, a perfect alibi for launch week. It never says
// GTA 6: a real excuse never names the game.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

const ENTRY =
  "Sorry, our lift broke with the plumber trapped inside, and I have to stay home for the rescue crew.";

const GATE = {
  minChars: 1,
  maxChars: 140,
  maxWords: 20,
  expectedLines: 1,
  outPath: "/output/entry.txt",
  outDir: "/output",
} as const;

// ---------------------------------------------------------------------------
// The gate: each rule is a small named check, run in order
// ---------------------------------------------------------------------------

type Rule = {
  name: string;
  check: (text: string) => void;
};

const RULES: Rule[] = [
  {
    name: "length",
    check: (text) => {
      if (text.length < GATE.minChars || text.length > GATE.maxChars) {
        throw new Error(
          `entry is ${text.length} characters, must be ${GATE.minChars}-${GATE.maxChars}`,
        );
      }
    },
  },
  {
    name: "word-count",
    check: (text) => {
      const words = text.split(/\s+/).filter(Boolean).length;
      if (words > GATE.maxWords) {
        throw new Error(`entry is ${words} words, must be at most ${GATE.maxWords}`);
      }
    },
  },
  {
    name: "non-blank",
    check: (text) => {
      if (text.trim().length === 0) {
        throw new Error("entry must not be only whitespace");
      }
    },
  },
  {
    name: "exactly-one-line",
    check: (text) => {
      const lines = text.split("\n");
      if (lines.length !== GATE.expectedLines) {
        throw new Error(
          `entry must be exactly ${GATE.expectedLines} line, got ${lines.length}`,
        );
      }
      if (/\r/.test(text)) {
        throw new Error("entry must not contain a carriage return");
      }
    },
  },
  {
    name: "no-surrounding-whitespace",
    check: (text) => {
      if (text !== text.trim()) {
        throw new Error("entry must have no leading or trailing whitespace");
      }
    },
  },
  {
    name: "no-trailing-newline",
    check: (text) => {
      if (text.endsWith("\n") || text.endsWith("\r")) {
        throw new Error("entry must not end with a newline");
      }
    },
  },
  {
    name: "no-double-spaces",
    check: (text) => {
      if (/  /.test(text)) {
        throw new Error("entry must not contain double spaces");
      }
    },
  },
  {
    name: "opens-like-a-hurried-text",
    check: (text) => {
      // A text sent in a hurry opens with the apology, no greeting,
      // no "Dear", no name — straight into the problem.
      if (!/^Sorry, /i.test(text)) {
        throw new Error("entry must open like a hurried text: Sorry,");
      }
    },
  },
  {
    name: "boring-specific-detail",
    check: (text) => {
      // The brief's second criterion: a real, specific, boring
      // workplace detail rather than a wild story. The detail is a
      // broken lift and a trapped plumber — specific trade, specific
      // failure, nothing dramatic.
      const lower = text.toLowerCase();
      if (!lower.includes("lift broke")) {
        throw new Error("entry must name its specific boring failure: lift broke");
      }
      if (!lower.includes("plumber")) {
        throw new Error("entry must name its specific trade: plumber");
      }
    },
  },
  {
    name: "obligation-not-choice",
    check: (text) => {
      // The excuse must create an obligation: the sender HAS to stay
      // home, it is not a choice. "I have to stay home" is the hook
      // the manager almost believes.
      if (!/i have to stay home/i.test(text)) {
        throw new Error("entry must create an obligation: I have to stay home");
      }
    },
  },
  {
    name: "laugh-from-own-logic",
    check: (text) => {
      // The laugh must come from the excuse's own logic, not a joke
      // bolted on the end. The logic: the lift broke WITH the plumber
      // trapped inside — the one person who could fix a lift is the
      // one trapped in it.
      const lower = text.toLowerCase();
      if (!lower.includes("plumber trapped inside")) {
        throw new Error("entry must carry its own logic: plumber trapped inside");
      }
    },
  },
  {
    name: "no-obvious-excuse",
    check: (text) => {
      // The brief warns against the obvious excuses: a dead
      // grandmother, a flat tyre, a sudden fever. All three are
      // rejected outright, along with the car and the sick day.
      const lower = text.toLowerCase();
      const banned = [
        "grandmother",
        "grandma",
        "flat tyre",
        "flat tire",
        "fever",
        "sick",
        "food poisoning",
        "car broke",
        "car won't start",
      ];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not rest on the obvious excuse: ${phrase}`);
        }
      }
    },
  },
  {
    name: "never-names-the-game",
    check: (text) => {
      // A real excuse never names the game. Mentioning GTA 6 would
      // be the confession itself — the manager would believe nothing.
      const lower = text.toLowerCase();
      if (lower.includes("gta") || lower.includes("grand theft") || lower.includes("launch week")) {
        throw new Error("entry must never name the game");
      }
    },
  },
  {
    name: "no-filler-no-hedge",
    check: (text) => {
      // A long excuse sounds rehearsed, and a rehearsed one is
      // already a confession. No filler, no hedging — a hurried text
      // has no room for "basically" or "unfortunately".
      const lower = text.toLowerCase();
      const banned = [
        "basically",
        "actually",
        "kind of",
        "sort of",
        "unfortunately",
        "very sorry",
        "so sorry",
      ];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not hedge or pad the excuse: ${phrase}`);
        }
      }
    },
  },
  {
    name: "no-signature-no-explanation",
    check: (text) => {
      // One line, plain words, no setup, no explanation, no
      // signature — the way a text sent in a hurry reads.
      const lower = text.toLowerCase();
      if (lower.includes("regards") || lower.includes("thanks") || lower.includes("please let me know")) {
        throw new Error("entry must not carry a signature or explanation");
      }
      if (/\b(i|my) (name|number) is\b/.test(lower)) {
        throw new Error("entry must not carry an introduction");
      }
    },
  },
];

function validate(text: string): void {
  for (const rule of RULES) {
    rule.check(text);
  }
}

// ---------------------------------------------------------------------------
// Write, read back, and report
// ---------------------------------------------------------------------------

function writeEntry(text: string): void {
  mkdirSync(GATE.outDir, { recursive: true });
  writeFileSync(GATE.outPath, text, "utf8");
}

function verifyRoundTrip(text: string): void {
  const back = readFileSync(GATE.outPath, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  // Second pass: the text on disk must pass the same gate on its own,
  // so a write that silently altered the entry cannot slip through.
  validate(back);
}

function report(text: string): void {
  const words = text.split(/\s+/).filter(Boolean).length;
  console.log(`wrote ${GATE.outPath} (${text.length} characters, ${words} words)`);
  console.log(`entry (${text.length} chars): ${text}`);
  console.log(
    `detail: lift broke + plumber trapped inside; ` +
      `obligation: stay home for the rescue crew; game never named`,
  );
  console.log(text);
}

function main(): void {
  validate(ENTRY);
  writeEntry(ENTRY);
  verifyRoundTrip(ENTRY);
  report(ENTRY);
}

main();
