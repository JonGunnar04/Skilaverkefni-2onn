import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validate, validateParams } from '../middleware/validate.js';
import {
  createNewAuthorAsync,
  deleteAuthorAsync,
  loadAllAuthorsAsync,
} from '../service/authorsService.js';
import { createAuthorRequest, UUIDParams } from '../schemas/authorsSchema.js';
import {
  deleteArticleAsync,
  loadAllArticlesAsync,
} from '../service/arcticlesService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const authorsFilePath = path.join(__dirname, '../data/authors.json');
const articlesFilePath = path.join(__dirname, '../data/articles.json');

/*
router.get('/', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Authors fetched successfully' });
});

router.get('/:id', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Author fetched successfully' });
});
*/

// Get all authors

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await loadAllAuthorsAsync(authorsFilePath);
    res.status(200).json({ authors });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
});

// Get author by Id

router.get(
  '/:id',
  validateParams(UUIDParams),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const authors = await loadAllAuthorsAsync(authorsFilePath);
    const author = authors.find((authors) => {
      return authors.id === id;
    });

    if (!author) {
      res.status(404).json({
        error: {
          status: 404,
          message: 'Author not found',
        },
      });
      return;
    }
    res.status(200).json({ author });
  }
);

// Get articles by author

router.get(
  '/:id/articles',
  validateParams(UUIDParams),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const authors = await loadAllAuthorsAsync(authorsFilePath);
    const articles = await loadAllArticlesAsync(articlesFilePath);

    const author = authors.find((authors) => {
      return authors.id === id;
    });
    if (!author) {
      res.status(404).json({
        error: {
          status: 404,
          message: 'Author not found',
        },
      });
      return;
    }

    const articlesById = articles.filter((articles) => {
      return articles.authorId === author.id;
    });

    res.status(200).json({ articlesById });
  }
);

// Post, create a new author

router.post(
  '/',
  validate(createAuthorRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, bio } = req.body;
      const created = await createNewAuthorAsync(name, email, bio);

      res.status(201).json({ created });
    } catch(err) {
      console.log(err)
      next(err);
    }
  }
);

// Delete an author

router.delete(
  '/:id',
  validateParams(UUIDParams),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const authors = await loadAllAuthorsAsync(authorsFilePath);
    const author = authors.find((authors) => {
      return authors.id === id;
    });
    if (!author) {
      res.status(404).json({
        error: {
          status: 404,
          message: 'Author not found',
        },
      });
      return;
    }
    const articles = await loadAllArticlesAsync(articlesFilePath);
    const articlesById = articles.filter((articles) => {
      return articles.authorId === id;
    });
    if (articlesById) {
      articlesById.forEach(async (article) => {
        await deleteArticleAsync(article.id);
      });

      try {
        await deleteAuthorAsync(id);
        res.status(200).json({
          message: 'Author deleted successfully',
        });
      } catch (err) {
        res.status(404).json({
          error: {
            status: 404,
            message: 'Author not found',
          },
        });
        next(err);
      }
    }
  }
);

export default router;
