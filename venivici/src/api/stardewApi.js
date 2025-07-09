// src/api/stardewApi.js
import items from '../data/items.json'

/**
 * Return one random Stardew item, excluding banned type/season/id.
 */
export async function fetchRandomItem(banList = []) {
  const filtered = items.filter(item =>
    !banList.includes(item.type) &&
    !banList.includes(item.season) &&
    !banList.includes(item.id)
  )
  if (!filtered.length) {
    throw new Error('No items left… clear some bans.')
  }
  return filtered[Math.floor(Math.random() * filtered.length)]
}

/**
 * Return the item whose name exactly matches (case‐insensitive), or null.
 * @param {string} name 
 */
export function getItemByName(name) {
  const target = name.trim().toLowerCase()
  return items.find(item => item.name.toLowerCase() === target) || null
}
