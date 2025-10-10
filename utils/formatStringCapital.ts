/**
 * Formats a string to capitalize the first letter of each word
 * @param str - The string to format
 * @param lowerRest - Whether to lowercase the rest of each word (default: true)
 * @returns The formatted string with capitalized words
 */
export const formatStringCapital = (
  str: string | undefined | null,
  lowerRest = true,
): string => {
  if (!str) return "";

  return str
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";

      const firstChar = word.charAt(0).toUpperCase();
      const restOfWord = lowerRest
        ? word.slice(1).toLowerCase()
        : word.slice(1);

      return `${firstChar}${restOfWord}`;
    })
    .join(" ");
};

export default formatStringCapital;
