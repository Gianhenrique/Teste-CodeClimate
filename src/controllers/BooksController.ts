import { Request, Response } from 'express'

import Books from '@models/Books'

class BooksController {
  async index (request: Request, response: Response) {
    try {
      const { author } = request.query

      if (!author) {
        const books = await Books.find()

        if (!books) {
          return response.status(400).json({ message: 'Books not found' })
        }

        return response.json(books)
      }

      const books = await Books.find({ author })

      if (!books) {
        return response.status(400).json({ message: 'This author"s books were not found' })
      }

      response.json(books)
    } catch (error) {
      return response.status(400).json({
        message: 'Books not found',
        error
      })
    }
  }

  async show (request: Request, response: Response) {
    try {
      const { id } = request.params

      const book = await Books.findById(id).populate('author')

      if (!book) {
        return response.status(400).json({ message: 'Book not found' })
      }

      response.json(book)
    } catch (error) {
      return response.status(400).json({
        message: 'Book not found',
        error
      })
    }
  }

  async create (request: Request, response: Response) {
    try {
      const {
        author,
        name,
        resume,
        chaptersQty,
        pagesQty
      } = request.body

      const book = await Books.create({
        author,
        name,
        resume,
        chaptersQty,
        pagesQty
      })

      return response.json(book)
    } catch (error) {
      return response.status(400).json({
        message: 'Error creating book',
        error
      })
    }
  }

  async update (request: Request, response: Response) {
    try {
      const { id } = request.params

      const verify = await Books.findOne({ _id: id })

      if (!verify) {
        return response.status(400).json({
          message: 'Book not found'
        })
      }

      const book = await Books.findByIdAndUpdate(id, request.body,
        {
          new: true
        }
      )

      return response.json(book)
    } catch (error) {
      return response.status(400).json({
        message: 'Error update book',
        error
      })
    }
  }

  async delete (request: Request, response: Response) {
    try {
      const { id } = request.params

      const verify = await Books.findOne({ _id: id })

      if (!verify) {
        return response.status(400).json({
          message: 'Book not found'
        })
      }

      await Books.findByIdAndRemove(id)
      response.status(200).send()
    } catch (error) {
      return response.status(400).json({
        message: 'Error delete book',
        error
      })
    }
  }
}

export default BooksController
