import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  image?: string;
}

export interface ContentMeta extends ContentFrontmatter {
  slug: string;
  readingTime: string;
}

export interface ContentWithBody extends ContentMeta {
  content: string;
}

/**
 * Get a single content file by slug
 */
export function getContentBySlug(
  folder: string,
  slug: string
): ContentWithBody | null {
  const folderPath = path.join(contentDirectory, folder);
  const filePath = path.join(folderPath, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    author: data.author || "CashLoanMY Team",
    category: data.category,
    tags: data.tags || [],
    featured: data.featured || false,
    image: data.image,
    readingTime: stats.text,
    content,
  };
}

/**
 * Get all content from a folder
 */
export function getAllContent(folder: string): ContentMeta[] {
  const folderPath = path.join(contentDirectory, folder);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs.readdirSync(folderPath);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const content = mdxFiles.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(folderPath, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      author: data.author || "CashLoanMY Team",
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image,
      readingTime: stats.text,
    };
  });

  // Sort by publishedAt (newest first)
  return content.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get all slugs for a folder (for generateStaticParams)
 */
export function getAllSlugs(folder: string): string[] {
  const folderPath = path.join(contentDirectory, folder);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs.readdirSync(folderPath);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get featured content from a folder
 */
export function getFeaturedContent(folder: string): ContentMeta[] {
  const allContent = getAllContent(folder);
  return allContent.filter((item) => item.featured);
}

/**
 * Get content by category
 */
export function getContentByCategory(
  folder: string,
  category: string
): ContentMeta[] {
  const allContent = getAllContent(folder);
  return allContent.filter(
    (item) => item.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get content by tag
 */
export function getContentByTag(folder: string, tag: string): ContentMeta[] {
  const allContent = getAllContent(folder);
  return allContent.filter((item) =>
    item.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
