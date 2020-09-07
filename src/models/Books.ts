import mongoose from '@database/connection'

const BooksSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authors',
    require: true
  },
  name: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  chaptersQty: {
    type: Number,
    required: true
  },
  pagesQty: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const Books = mongoose.model('Books', BooksSchema)

export default Books
