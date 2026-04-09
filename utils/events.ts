export type EventType = {
  label: string;
  color: string;
};

export const EVENTS: Record<string, EventType[]> = {
  "01-26": [{ label: "Republic Day 🇮🇳", color: "bg-green-500" }],
  "08-15": [{ label: "Independence Day 🇮🇳", color: "bg-green-500" }],
  "03-08": [{ label: "Women's Day", color: "bg-pink-500" }],
  "11-19": [{ label: "Men's Day", color: "bg-blue-500" }],
  "10-02": [{ label: "Gandhi Jayanti", color: "bg-orange-500" }],
  "12-25": [{ label: "Christmas 🎄", color: "bg-red-500" }],
  "01-01": [{ label: "New Year 🎉", color: "bg-purple-500" }],
};
