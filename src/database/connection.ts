import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-y8xkp.mongodb.net/codeClimate?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

export default mongoose
