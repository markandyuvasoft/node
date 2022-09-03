import mongoose from 'mongoose';
const Schema=mongoose.Schema

const bookSchema = new Schema({
   name: String,
   publishYear: Number,
   author: String,
   publisher: {
      type: Schema.Types.ObjectId,
      ref: 'Publisher',
      required: true
   }
},
);


const Book = new mongoose.model("Book",bookSchema)

export default Book;