import mongoose from '@database/connection'

const AuthorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    unique: true,
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const Authors = mongoose.model('Authors', AuthorsSchema)

export default Authors
