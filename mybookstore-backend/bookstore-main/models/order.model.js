import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bookStoreModel from "./bookStore.model.js";
import userModel from "./user.model.js";

const { Schema } = mongoose,
  orderSchema = new Schema(
    {
      order_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      order_item: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "books",
          required: true,
        },
      ],
      total: {
          type: mongoose.Types.Decimal128,
          required: true
      }
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  orderSchema.plugin(mongoosePaginate);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
