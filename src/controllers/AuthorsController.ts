import { Request, Response } from 'express'

import Authors from '@models/Authors'

class AuthorsController {
  async index (request: Request, response: Response) {
    try {
      const author = await Authors.find()

      if (!author) {
        return response.status(400).json({ message: 'Author"s not found' })
      }

      response.json(author)
    } catch (error) {
      return response.status(400).json({
        message: 'Author"s not found',
        error
      })
    }
  }

  async show (request: Request, response: Response) {
    try {
      const { id } = request.params

      const author = await Authors.findById(id)

      if (!author) {
        return response.status(400).json({ message: 'Author not found' })
      }

      response.json(author)
    } catch (error) {
      return response.status(400).json({
        message: 'Author not found',
        error
      })
    }
  }

  async create (request: Request, response: Response) {
    try {
      const {
        name,
        email
      } = request.body

      const verify = await Authors.findOne({ email })

      if (verify) {
        return response.status(400).json({
          message: 'Email already exists in system'
        })
      }

      const author = await Authors.create({
        name,
        email
      })

      return response.json(author)
    } catch (error) {
      return response.status(400).json({
        message: 'Error creating author',
        error
      })
    }
  }

  async update (request: Request, response: Response) {
    try {
      const { id } = request.params

      const verify = await Authors.findOne({ _id: id })

      if (!verify) {
        return response.status(400).json({
          message: 'Author not found'
        })
      }

      const author = await Authors.findByIdAndUpdate(id, request.body,
        {
          new: true
        }
      )

      return response.json(author)
    } catch (error) {
      return response.status(400).json({
        message: 'Error update author',
        error
      })
    }
  }

  async delete (request: Request, response: Response) {
    try {
      const { id } = request.params

      const verify = await Authors.findOne({ _id: id })

      if (!verify) {
        return response.status(400).json({
          message: 'Author not found'
        })
      }

      await Authors.findByIdAndRemove(id)
      response.status(200).send()
    } catch (error) {
      return response.status(400).json({
        message: 'Error delete author',
        error
      })
    }
  }
}

export default AuthorsController
