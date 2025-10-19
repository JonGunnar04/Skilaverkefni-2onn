import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validate, validateParams } from '../middleware/validate.js';
import {
  Articles,
  createNewArticleAsync,
  deleteArticleAsync,
  loadAllArticlesAsync,
} from '../service/arcticlesService.js';
import { UUIDParams } from '../schemas/authorsSchema.js';
import { createArticleRequest } from '../schemas/arcticlesSchema.js';
import { loadAllAuthorsAsync } from '../service/authorsService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const articlesFilePath = path.join(__dirname, '../data/articles.json');
const authorsFilePath = path.join(__dirname, '../data/authors.json');

/*
router.get('/', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Articles fetched successfully' });
});

router.get('/:id', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Article fetched successfully' });
});
*/

// Get all articles

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await loadAllArticlesAsync(articlesFilePath);
    res.status(200).json({
      articles,
    });
  } catch (err) {
    next(err);
  }
});

// Get article by id

router.get(
  '/:id',
  validateParams(UUIDParams),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const articles = await loadAllArticlesAsync(articlesFilePath);
    const article = articles.find((article: Articles) => {
      return article.id === id;
    });

    if (!article) {
      res.status(404).json({
        error: {
          status: 404,
          message: 'Article not found',
        },
      });
      return;
    }
    res.status(200).json({
      article,
    });
  }
);

// Post, create a new article
// NEED TO TEST THIS AFTER FINISHING THE AUTHOR ROUTES

router.post(
  '/',
  validate(createArticleRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('hallo jon gunna1')

      const { article } = req.body;
       console.log('hallo jon gunnar2')

      await createNewArticleAsync(article.title, article.content, article.authorId);
      console.log('hallo jon gunnar3')

      const authors = await loadAllAuthorsAsync(authorsFilePath);
      console.log('hallo jon gunnar4')
      const author = authors.find((authors) => {
        return authors.id === article.authorId;
      });
      console.log('hallo jon gunnar5')

      if (!author) {
        res.status(400).json({
          "authorId": "must be assigned to an existing author"
        });
        return;
      }

      console.log('hello')

      res.status(201).json({
        article,
      });
    } catch(err) {
      next(err);
    }
  }
);

// Delete an article

router.delete(
  '/:id',
  validateParams(UUIDParams),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const articles = await loadAllArticlesAsync(articlesFilePath);

    const article = articles.find((articles) => {
      return articles.id === id;
    });

    if (!article) {
      res.status(404).json({
        error: {
          status: 404,
          message: 'Article not found',
        },
      });
      return;
    }

    try {
      const deleted = await deleteArticleAsync(article.id);
      if (!deleted) {
        res.status(404).json({
          error: {
            status: 404,
            message: 'Article not found',
          },
        });
      }
      res.status(200).json({
        message: 'Article deleted successfully',
      });
      return;
    } catch (err) {
      res.status(404).json({
        error: {
          status: 404,
          message: 'Article not found',
        },
      });
      next(err);
    }
  }
);

export default router;
