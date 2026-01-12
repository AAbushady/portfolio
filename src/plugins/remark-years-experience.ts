import { findAndReplace } from 'mdast-util-find-and-replace';

/**
 * Replaces {{yearsOfExperience}} with a span that JS can update client-side.
 * Build-time value serves as fallback if JS is disabled.
 */
export function remarkYearsExperience() {
  const years = new Date().getFullYear() - 2020;
  return (tree: any) => {
    findAndReplace(tree, [
      [/\{\{yearsOfExperience\}\}/g, () => ({
        type: 'html',
        value: `<span class="years-exp">${years}+</span>`
      })]
    ]);
  };
}
