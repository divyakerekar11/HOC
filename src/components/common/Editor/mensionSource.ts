import { MentionUser } from "./types";

export const mentionSource = (
  searchTerm: string,
  renderList: (matches: MentionUser[], searchTerm: string) => void,
  mentionChar: string,
  userData: MentionUser[] // Pass userData as a parameter
) => {
  const atValues: MentionUser[] = userData.map((user) => ({
    id: user.id,
    value: user.name, // Adjust 'name' to match your API response structure
  }));

  const hashValues: MentionUser[] = [
    { id: 1, value: "important" },
    { id: 2, value: "announcement" },
    { id: 3, value: "bug" },
    { id: 4, value: "feature" },
    { id: 5, value: "documentation" },
  ];

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
