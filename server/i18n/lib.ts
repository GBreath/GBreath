import { locales } from "./locales";

const fallbackLang = "en";

let lang = "en";

export const setLang = (_lang: string) => {
  if (Object.keys(locales).includes(_lang)) {
    lang = _lang;
    return;
  }

  lang = "en";

  return;
};

// $st stands for $serverTranslation
export const $st = (string: string) => {
  const tokenize = string.split(".");

  if (!tokenize.length) {
    return locales[lang];
  } else {
    const res = getDescendantProp(locales[lang], string);
    const fallbackRes = getDescendantProp(locales[fallbackLang], string);

    return res ? res : fallbackRes ? fallbackRes : string;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDescendantProp(obj: any, string: string) {
  try {
    return string.split(".").reduce((a, b) => a[b], obj);
  } catch (error) {
    return undefined;
  }
}
