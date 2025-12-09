export function shouldEscalate(text: string): boolean {
  const keywords = [
    "suicide",
    "kill myself",
    "want to die",
    "end my life",
    "self-harm",
    "hurt myself",
    "harm myself",
    "i want to die",
  ];

  const lower = text.toLowerCase();

  return keywords.some((k) => lower.includes(k));
}
