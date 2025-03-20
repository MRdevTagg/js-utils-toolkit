import GlobalState from './GlobalState.js';
import * as generalUtils from './generalUtils.js';

export {
  GlobalState,
  generalUtils
};

export const {
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
  
  arrIf,
  getBy,
  
  capitalizeWords,
  camelCaseToCapital,

  safeCall,
  callOn,
  switchOn
} = generalUtils;
