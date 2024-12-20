import { MentionUser } from "./types";

export const atValues: MentionUser[] = [];

export const hashValues: MentionUser[] = [
  { id: 1, value: "important" },
  { id: 2, value: "announcement" },
  { id: 3, value: "bug" },
  { id: 4, value: "feature" },
  { id: 5, value: "documentation" },
];

export const mentionSource = (
  searchTerm: string,
  renderList: (matches: MentionUser[], searchTerm: string) => void,
  mentionChar: string
) => {
  const values = mentionChar === "@" ? atValues : hashValues;

  if (searchTerm.length === 0) {
    renderList(values, searchTerm);
  } else {
    const matches = values.filter((item) =>
      item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderList(matches, searchTerm);
  }
};
