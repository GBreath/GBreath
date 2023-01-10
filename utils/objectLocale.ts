// $ot stands for $objectTranslation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function $ot(object: { [key in string]: any }, locale: string) {
  if (locale === "pt") {
    return object.pt;
  } else {
    return object.en;
  }
}
