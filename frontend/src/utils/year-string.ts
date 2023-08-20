export function getYearString(value: number): string {
  const yearMappings: Record<number, string> = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year",
    5: "5th Year",
    6: "6th Year",
    7: "7th Year",
    8: "8th Year",
    9: "9th Year",
    10: "10th Year",
  };

  return yearMappings[value] || "";
}
