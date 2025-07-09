// // src/api/stardewApi.js
import items from '../data/items.json';

/**
 * Fetch one random Stardew item, excluding any whose
 * type, season, or id appears in the banList.
 *
 * @param {string[]} banList  list of banned values (type, season, or id)
 * @returns {Promise<Object>} the selected item
 */
export async function fetchRandomItem(banList = []) {
  // 2. Filter out banned values
  const filtered = items.filter(item =>
    !banList.includes(item.type) &&
    !banList.includes(item.season) &&
    !banList.includes(item.id)
  )

  // 3. If nothing remains, throw
  if (filtered.length === 0) {
    throw new Error(
      'No items left after applying your ban list. Please clear some bans to continue!'
    )
  }

  // 4. Pick one at random and return
  const idx = Math.floor(Math.random() * filtered.length)
  return filtered[idx]
}