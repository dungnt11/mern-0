export default function isEmpty(arg) {
  return (
    arg === null ||
    arg === undefined ||
    (typeof arg === "object" && Object.keys(arg).length === 0) ||
    (typeof arg === "string" && arg.trim().length === 0)
  );
}
