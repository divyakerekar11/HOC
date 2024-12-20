import React from "react";
import { useUserStore } from "@/Store/UserStore";
import { MentionUser } from "./types";

const MentionComponent = () => {
  const { userData } = useUserStore(); // Use the fetched user data from the store

  // Convert userData to MentionUser type
  const atValues: MentionUser[] = userData.map((user) => ({
    id: user.id,
    value: user.name, // Adjust 'name' based on your API response
  }));

  const hashValues: MentionUser[] = [
    { id: 1, value: "important" },
    { id: 2, value: "announcement" },
    { id: 3, value: "bug" },
    { id: 4, value: "feature" },
    { id: 5, value: "documentation" },
  ];

  const mentionSource = (
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

  return (
    <div>
      {/* The mentionSource function can now be used in your Quill editor */}
    </div>
  );
};

export default MentionComponent;
