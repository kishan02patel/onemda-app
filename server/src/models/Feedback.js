import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Engagement = Object.freeze({
  Low: '0',
  Minimal: '1',
  Average: '2',
  High: '3',
})

const TrainerFeedbackSchema = new Schema({
  serviceID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Service'
  },
  engagement: {
    type: String,
    enum: Object.values(Engagement),
    required: true
  }
})

const FeedbackSchema = new Schema({
  activityID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  trainerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participantFeedback: {
    type: String,
    enum: Object.values(Engagement),
    required: true
  },
  trainerFeedback: [TrainerFeedbackSchema],
  comment: {
    type: String,
  },
}, {collection: 'feedback', timestamps: true})

const Feedback = mongoose.model('Feedback', FeedbackSchema)

export default Feedback