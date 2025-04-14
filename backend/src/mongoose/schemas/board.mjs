import mongoose from 'mongoose';

const {Schema} = mongoose

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', 
      },
    ],
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
