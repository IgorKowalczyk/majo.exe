export const flagsArray = [
 {
  flags: 1, // 1 << 0 = 1
  content: "Discord Staff",
  name: "STAFF",
 },
 {
  flags: 2, // 1 << 1 = 2
  content: "Discord Partner",
  name: "PARTNER",
 },
 {
  flags: 4, // 1 << 2 = 4
  content: "HypeSquad Events",
  name: "HYPESQUAD",
 },
 {
  flags: 8, // 1 << 3 = 8
  content: "Bug Hunter Level 1",
  name: "BUG_HUNTER_LEVEL_1",
 },
 {
  flags: 64, // 1 << 6 = 64
  content: "HypeSquad Bravery",
  name: "HYPESQUAD_ONLINE_HOUSE_1",
 },
 {
  flags: 128, // 1 << 7 = 128
  content: "HypeSquad Brilliance",
  name: "HYPESQUAD_ONLINE_HOUSE_2",
 },
 {
  flags: 256, // 1 << 8 = 256
  content: "HypeSquad Balance",
  name: "HYPESQUAD_ONLINE_HOUSE_3",
 },
 {
  flags: 512, // 1 << 9 = 512
  content: "Premium Early Supporter",
  name: "PREMIUM_EARLY_SUPPORTER",
 },
 {
  flags: 16384, // 1 << 14 = 16384
  content: "Bug Hunter Level 2",
  name: "BUG_HUNTER_LEVEL_2",
 },
 {
  flags: 65536, // 1 << 16 = 65536
  content: "Verified Bot",
  name: "VERIFIED_BOT",
 },
 {
  flags: 131072, // 1 << 17 = 131072
  content: "Verified Developer",
  name: "VERIFIED_DEVELOPER",
 },
 {
  flags: 4194304, // 1 << 22 = 4194304
  content: "Active Developer",
  name: "ACTIVE_DEVELOPER",
 },
];

/**
 * @param {number} number The number to get the flags from.
 * @returns {Array} The flags
 * @example const flags = getFlags(4194304)
 * */
export function getFlags(number) {
 return flagsArray.reduce((acc, flag) => {
  if (Number(number) & flag.flags) acc.push(flag);
  return acc;
 }, []);
}
