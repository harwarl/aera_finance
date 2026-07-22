// A minimal 5x7 dot-matrix glyph set, just enough coverage for brand
// wordmarks like "AERA FINANCE". Each glyph is 7 rows of a 5-bit string.
const GLYPHS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
};

const ROWS = 7;
const SPACE_WIDTH = 3;

export function buildDotMatrix(text: string) {
  const grid: boolean[][] = Array.from({ length: ROWS }, () => []);

  text
    .toUpperCase()
    .split("")
    .forEach((char, i) => {
      if (char === " ") {
        for (let row = 0; row < ROWS; row++) {
          grid[row].push(...Array(SPACE_WIDTH).fill(false));
        }
        return;
      }

      const glyph = GLYPHS[char];
      if (!glyph) return;

      for (let row = 0; row < ROWS; row++) {
        grid[row].push(...glyph[row].split("").map((bit) => bit === "1"));
        if (i < text.length - 1) grid[row].push(false);
      }
    });

  return grid;
}
