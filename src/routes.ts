import express from 'express'

import AuthorsController from '@controllers/AuthorsController'
import BooksController from '@controllers/BooksController'

const routes = express.Router()

const authorsController = new AuthorsController()
const booksController = new BooksController()

routes.get('/authors', authorsController.index)
routes.get('/authors/:id', authorsController.show)
routes.post('/authors', authorsController.create)
routes.put('/authors/:id', authorsController.update)
routes.delete('/authors/:id', authorsController.delete)

routes.get('/books', booksController.index)
routes.get('/books/:id', booksController.show)
routes.post('/books', booksController.create)
routes.put('/books/:id', booksController.update)
routes.delete('/books/:id', booksController.delete)

routes.get('/teste', (request, response) => {
  return response.json({
    message: 'Teste do CodeClimate'
  })
})

export default routes
