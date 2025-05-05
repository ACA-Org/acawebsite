export const labelFormatter = (label: string) => {
  const items = label.split(" ");
  return items
    .map((word) => {
      if (word.toLowerCase().trim() === "aca") return "ACA";
      if (word.toLowerCase().trim() === "and") return "&";
      return word;
    })
    .join(" ");
};
