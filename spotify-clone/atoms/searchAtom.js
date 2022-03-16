import { atom } from "recoil";

export const showSearchState = atom({
  key: "showSearchState",
  default: false
})

export const songSearchResultsState = atom({
  key: "songSearchResultsState",
  default: []
})