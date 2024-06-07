import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose,
  booksSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        index: true,
        required: true
      },
      categories: {
        type: String,
        index: true,
        enum: ["romantic", "thriller", "horror","autobiography","fantasy","scifi"]
      },
      description: {
        type: String,
        default: null
      },
      price: {
        type: Number,
        required: true
      },
      
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

booksSchema.plugin(mongoosePaginate);

const bookStoreModel = mongoose.model("books", booksSchema);

export default bookStoreModel;
