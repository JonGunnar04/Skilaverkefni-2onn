import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const filePath = './src/data/authors.json';

const createId = () => {
  return randomUUID();
};

export type Authors = {
  id: string;
  name: string;
  email: string;
  bio: string;
};

// Save the author array

export const saveAuthorsAsync = async (authors: Authors[]) => {
  try {
    await writeFile(filePath, JSON.stringify(authors, null, 2));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`SaveAuthorsAsync: ${err.message}`);
    }
    throw new Error('SaveAuthorsAsync: Unknown error');
  }
};

// Load all authors function

export const loadAllAuthorsAsync = async (
  filePath: string
): Promise<Authors[]> => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    console.log(err);
    throw new Error('loadAllAuthors: ' + err.message);
  }
};

// Create a new author

export const createNewAuthorAsync = async (
  name: string,
  email: string,
  bio: string
) => {
  const authors = await loadAllAuthorsAsync(filePath);
  const newAuthor = {
    id: createId(),
    name: name,
    email: email,
    bio: bio,
  };
  authors.push(newAuthor);
  await saveAuthorsAsync(authors);
};

// Delete an author

export const deleteAuthorAsync = async (id: string) => {
  const authors = await loadAllAuthorsAsync(filePath);
  const author = authors.find((author) => {
    return author.id === id;
  });

  if (!author) {
    return;
  }

  const newAuthors = authors.filter((authors) => {
    return authors.id !== id;
  });

  saveAuthorsAsync(newAuthors);
};
