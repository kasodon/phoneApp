import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
    {
        first_name: {
          type: String,
          required: true
        },
        last_name: {
            type: String,
            required: true
          },
        gender: {
          type: String,
          required: true
        },
        phone: {
            type: String,
            required: true
          },
        creator: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      },
      { timestamps: true }
);

export default model('Contact', contactSchema);