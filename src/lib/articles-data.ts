// src/lib/articles-data.ts
import sketchingDissentPdf from "@/assets/articles/SKETCHING DISSENT.pdf";
import comparativeStudyPdf from "@/assets/articles/COMPARATIVE STUDY OF HUMAN AND MACHINE TRANSLATIONS.pdf?url";
import hydrosocialCyclePdf from "@/assets/articles/The Hydrosocial Cycle Water as Culture.pdf?url";
import mynameisjahan from "@/assets/articles/My Name Is Jahan” Queer Time, Anti-Futurity, and the Refusal of Reproductive Temporality in Saad T. Farooqi’s White World.pdf??url";
import theidology from "@/assets/articles/The Ideology of Standard English and Cultural Alienation in Pakistan.pdf";
// Article Interface
export interface Article {
  title: string;
  authors: string;
  pages: string;
  pdf: string;
}

// Issue Interface
export interface Issue {
  volume: string;
  year: string;
  articles: Article[];
  // Optional fields for future use
  coverImage?: string;
  description?: string;
  editor?: string[];
  issn?: string;
  publishedDate?: string;
}

// Individual articles data
export const articles: Article[] = [
  { 
    title: "SKETCHING DISSENT: MULTIMODAL HUMOUR AND NONVIOLENT RESISTANCE IN PAKISTANI COMICS", 
    authors: "A. Sehrish, A. Mahwish, A. Afshan", 
    pages: "1–17",
    pdf: sketchingDissentPdf
  },
  { 
    title: "COMPARATIVE STUDY OF HUMAN AND MACHINE TRANSLATIONS: A LINGUISTIC ANALYSIS OF LI BAI'S CHANGGAN BALLADS", 
    authors: "U. Inam, F. Laiba", 
    pages: "18–31",
    pdf: comparativeStudyPdf
  },
  { 
    title: "THE HYDROSOCIAL CYCLE: WATER AS CULTURE, NOT JUST RESOURCE; REIMAGINING SMALLHOLDER IRRIGATION DEVELOPMENT IN ZIMBABWE", 
    authors: "P. Vimbai, R. Lorraine, Z. Shingirirai, C. Tendai", 
    pages: "32–47",
    pdf: hydrosocialCyclePdf
  },
  { 
    title: "“My Name Is Jahan”: Queer Time, Anti-Futurity, and the Refusal of Reproductive Temporality in Saad T. Farooqi’s White World", 
    authors: "J. Mudassar", 
    pages: "48–58",
    pdf: mynameisjahan
  },
  { 
    title: "The Ideology of Standard English and Cultural Alienation in Pakistan: A Content Analysis of English Textbooks in Non-Elite Private Primary Schools in Khyber Pakhtunkhwa", 
    authors: "K. Bilal, A. Lubna, I. Romaisa",
    pages: "59–73",
    pdf: theidology
  }
  
];

// Issues data - easy to add more issues in the future
export const issues: Issue[] = [
  {
    volume: "Volume 1, Issue 1",
    year: "2026",
    articles: articles,
    // Optional metadata for future use
    // description: "Inaugural issue featuring groundbreaking research",
    // editor: ["Dr. Editor Name"],
    // issn: "1234-5678",
    // publishedDate: "January 2026"
  },
  // Future issues can be added here:
  // {
  //   volume: "Volume 2, Issue 1",
  //   year: "2027",
  //   articles: [...],
  //   description: "Special issue on AI in Education"
  // }
];

// ==================== HELPER FUNCTIONS ====================

// Get the latest issue (most recent)
export const getLatestIssue = (): Issue => {
  // Sort by year and get the first one
  const sorted = [...issues].sort((a, b) => Number(b.year) - Number(a.year));
  return sorted[0];
};

// Get the latest articles (for current issue page)
export const getLatestArticles = (): Article[] => {
  return getLatestIssue().articles;
};

// Get issue by volume number
export const getIssueByVolume = (volume: string): Issue | undefined => {
  return issues.find(issue => issue.volume === volume);
};

// Get issue by year
export const getIssueByYear = (year: string): Issue | undefined => {
  return issues.find(issue => issue.year === year);
};

// Get all issues sorted by year (newest first)
export const getIssuesByYear = (descending: boolean = true): Issue[] => {
  return [...issues].sort((a, b) => 
    descending ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year)
  );
};

// Get articles from a specific year
export const getArticlesByYear = (year: string): Article[] => {
  const issue = getIssueByYear(year);
  return issue ? issue.articles : [];
};

// Get article by title
export const getArticleByTitle = (title: string): Article | undefined => {
  // Search across all issues
  for (const issue of issues) {
    const article = issue.articles.find(a => a.title === title);
    if (article) return article;
  }
  return undefined;
};

// Get article by index (from latest issue)
export const getArticleByIndex = (index: number): Article | undefined => {
  return getLatestIssue().articles[index];
};

// Search articles by keyword
export const searchArticles = (query: string): Article[] => {
  const searchTerm = query.toLowerCase();
  const results: Article[] = [];
  
  for (const issue of issues) {
    const matched = issue.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.authors.toLowerCase().includes(searchTerm)
    );
    results.push(...matched);
  }
  
  return results;
};

// Get total count of articles across all issues
export const getTotalArticlesCount = (): number => {
  return issues.reduce((total, issue) => total + issue.articles.length, 0);
};

// Get article count by year
export const getArticleCountByYear = (year: string): number => {
  const issue = getIssueByYear(year);
  return issue ? issue.articles.length : 0;
};

// Get all unique authors
export const getAllAuthors = (): string[] => {
  const authorSet = new Set<string>();
  
  for (const issue of issues) {
    for (const article of issue.articles) {
      const authors = article.authors.split(',').map(a => a.trim());
      authors.forEach(author => authorSet.add(author));
    }
  }
  
  return Array.from(authorSet);
};

// Check if there are multiple issues
export const hasMultipleIssues = (): boolean => {
  return issues.length > 1;
};

// Get issue summary for display
export const getIssueSummary = (issue: Issue): string => {
  return `${issue.volume} (${issue.year}) - ${issue.articles.length} articles`;
};