export const languages = ["he", "en"] as const
export type Lang = (typeof languages)[number]

export const defaultLang: Lang = "he"

export function isValidLang(lang: string): lang is Lang {
  return languages.includes(lang as Lang)
}

export const translations = {
  he: {
    nav: {
      home: "בית",
      about: "אודות",
      essays: "מאמרים",
      books: "ספרים שיצאו לאור",
      articles: "כתבות שפורסמו",
      contact: "צור קשר",
    },
    home: {
      title: "בלוג ספרות",
      welcome: "!ברוכים הבאים לבלוג שלי",
      intro: "כאן תמצאו מאמרים ותובנות מספרים שקראתי.",
      enjoy: "!תהנו מהקריאה",
    },
    essays: {
      title: "מאמרים",
      searchPlaceholder: "חיפוש לפי קטגוריה או מילים במאמרים...",
      noResults: "אין מאמרים התואמים את החיפוש. נסו מילים או קטגוריות אחרות.",
      noEssays: "עדיין אין מאמרים בשפה זו.",
    },
    articles: {
      title: "כתבות שפורסמו",
      noArticles: "עדיין אין כתבות.",
      readArticle: "קרא את הכתבה",
    },
    backToEssays: "← חזרה למאמרים",
  },
  en: {
    nav: {
      home: "Home",
      about: "About myself",
      essays: "Essays",
      books: "Published Books",
      articles: "Published Articles",
      contact: "Contact",
    },
    home: {
      title: "Literature blog",
      welcome: "Welcome to my blog!",
      intro: "Here you'll find my essays and insights drawn from books I've read.",
      enjoy: "Enjoy your reading!",
    },
    essays: {
      title: "Essays",
      searchPlaceholder: "Search by category or words in essays...",
      noResults: "No essays match your search. Try different words or categories.",
      noEssays: "No essays in this language yet.",
    },
    articles: {
      title: "Published Articles",
      noArticles: "No articles yet.",
      readArticle: "Read article",
    },
    backToEssays: "← Back to Essays",
  },
} as const satisfies Record<Lang, Record<string, unknown>>

export function t(lang: Lang) {
  return translations[lang]
}
