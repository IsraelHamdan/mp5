function sanitizeHeaderValue(value) {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]/g, "");
}
