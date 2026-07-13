import { findAndReplace } from 'mdast-util-find-and-replace';
import { substituteYears } from '../utils/experience';

/**
 * Replaces {{yearsOfExperience}} in markdown bodies with a span that JS can
 * update client-side. Build-time value serves as fallback if JS is disabled.
 */
export function remarkYearsExperience() {
  return (tree: any) => {
    findAndReplace(tree, [
      [/\{\{yearsOfExperience\}\}/g, (match: string) => ({
        type: 'html',
        value: substituteYears(match, { html: true })
      })]
    ]);
  };
}
