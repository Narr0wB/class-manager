export function isInManutenzione() {
  return process.env.MANUTENZIONE === "true";
}