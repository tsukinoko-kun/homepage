/**
 * Synchronous hash
 */
export const hash = (input: string) => {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 2654435761);
  }
  return (h ^ (h >>> 16)) >>> 0;
};
