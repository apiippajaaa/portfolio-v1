export type Intent =
  | "skills"
  | "projects"
  | "experience"
  | "about"
  | "contact";

export function detectIntent(
  message: string
): Intent {
  const text = message.toLowerCase();

  if (
    /skill|stack|technology|tech/i.test(text)
  )
    return "skills";

  if (
    /project|portfolio|website|app|aplikasi/i.test(text)
  )
    return "projects";

  if (
    /experience|pengalaman|work|career/i.test(text)
  )
    return "experience";

  if (
    /contact|email|linkedin|github/i.test(text)
  )
    return "contact";

  return "about";
}