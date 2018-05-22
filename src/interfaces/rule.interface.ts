import { Message } from 'discord.js';

export interface Rule {

  /** All synonyms for this command */
  matches: string[];

  /** The prefix for this command, to match before any of the matches */
  prefix?: string;

  /** Position to check for the match, if omitted, match anywhere */
  position?: number;

  /** If true, overrides position and compares the entire string */
  wholeMessage?: boolean;

  /** If omitted or true, it will match case-sensitively */
  exact?: boolean;

  /** Whether or not to delete a matched message (after calling the action) */
  delete?: boolean;

  /**
   * Action callback that is called when message satsifies match requirements
   * @param msg Original discord message
   * @param args Message contents, split on space character
   */
  // action(msg: Message, args: string[]);
  action: any;

  /**
   * Prevalidation callback which is called every message after a match is found.
   * If a truthy value is returned, it will call the rule action. Useful for determining
   * if a user has permission or not.
   * @param msg Original discord message
   */
  // pre?(msg: Message): boolean;
  pre?: any;
};