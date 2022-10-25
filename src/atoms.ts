import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isDarkTAtom = atom({
  key: "isDarkText",
  default: "🌙",
});
