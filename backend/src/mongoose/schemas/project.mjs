import mongoose from 'mongoose';

const { Schema } = mongoose

const projectSchema = new Schema(
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
    status:
    {
      type: String,
      required: true
    }

  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
