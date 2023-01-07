// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function $ot(object: any, locale: string) {
  if (locale === "pt") {
    return object.pt;
  } else {
    return object.en;
  }
}
