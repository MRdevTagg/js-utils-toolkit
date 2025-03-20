import GlobalState from './GlobalState.js';
import * as generalUtils from './generalUtils.js';

export {
  GlobalState,
  generalUtils
};

// Also provide named exports for all general utilities
export const {
  // Object utilities
  isNonNullObject,
  onEntries,
  mapEntries,
  filterEntries,
  onKeys,
  mapKeys,
  filterKeys,
  onValues,
  mapValues,
  filterValues,
  transformEntries,
  objIf,
  safeParse,
  
  // Array utilities
  arrIf,
  getBy,
  
  // String utilities
  capitalizeWords,
  camelCaseToCapital,
  
  // Function utilities
  safeCall,
  callOn,
  switchOn
} = generalUtils;
