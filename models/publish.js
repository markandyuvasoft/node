import mongoose from 'mongoose';

const Schema=mongoose.Schema

const publisherSchema = new Schema({
   name: String,
   location: String,
   publishedBooks: [{
      type: Schema.Types.ObjectId,
      ref: 'Book'
   }]
},
);
publisherSchema.virtual('booksPublished', {
   ref: 'Book', 
   localField: '_id', 
   foreignField: 'publisher', 
});



 publisherSchema.set('toObject', { virtuals: true });
 publisherSchema.set('toJSON', { virtuals: true });
 

const Publisher = new mongoose.model("Publisher",publisherSchema)

export default Publisher;

