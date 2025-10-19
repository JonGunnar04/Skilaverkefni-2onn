import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { loadAllAuthorsAsync } from './authorsService';
import { NextFunction } from 'express';

const filePath = './src/data/articles.json';

const createId = () => {
  return randomUUID();
};

export type Articles = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

// Save the article array

export const saveArticlesAsync = async (articles: Articles[]) => {
  try {
    await writeFile(filePath, JSON.stringify(articles, null, 2));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`SaveArticlesAsync: ${err.message}`);
    }
    throw new Error('SaveArticlesAsync: Unknown error');
  }
};

// Load all articles function

export const loadAllArticlesAsync = async (
  filePath: string
): Promise<Articles[]> => {
  try {
    return JSON.parse(await readFile(filePath, 'utf-8'));
  } catch (err: any) {
    console.log(err);
    throw new Error('loadAllArticlesAsync: ' + err.message);
  }
};

// Create a new Article

export const createNewArticleAsync = async (
  title: string,
  content: string,
  authorId: string
) => {
  const articles = await loadAllArticlesAsync(filePath);
  const newArticle = {
    id: createId(),
    title: title,
    content: content,
    authorId: authorId,
  };

  const authors = await loadAllAuthorsAsync('./src/data/authors.json');
  const author = authors.find((authors) => {
    return authors.id === authorId;
  });

  if (!author) {
    return;
  }

  articles.push(newArticle);
  await saveArticlesAsync(articles);
};

// Delete an article

export const deleteArticleAsync = async (id: string): Promise<boolean> => {
  try {
    const articles = await loadAllArticlesAsync(filePath);
    const article = articles.find((article) => {
      return article.id === id;
    });

    if (!article) {
      throw new Error('Article not found');
    }

    const newArticles = articles.filter((article) => {
      return article.id !== id;
    });

    await saveArticlesAsync(newArticles);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('deleteArticleAsync: ' + err.message);
    }
    throw new Error('deleteArticleAsync: Unknown Error');
  }
};
