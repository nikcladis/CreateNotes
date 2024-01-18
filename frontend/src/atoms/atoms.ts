import { atom } from "recoil";
import { Note } from "@/models/note";

export const notesState = atom<Note[]>({
  key: "notesState",
  default: [],
});
