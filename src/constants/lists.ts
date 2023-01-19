// used to mark unsupported tokens, these are hosted lists of unsupported tokens
// beraDEX: update this
const BERADEX_LIST = './tokenLists/tokenlist.json'

export const UNSUPPORTED_LIST_URLS: string[] = []
// export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  BERADEX_LIST,
  //DIFFUSION_COMMUNITY_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [BERADEX_LIST]
