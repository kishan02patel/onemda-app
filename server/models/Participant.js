import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the Participant Schema.
const ParticipantSchema = new Schema({
  participantId: {
    type: String,
    required: true,
    unique: true
  },
  participantName: {
    type: String,
    required: true
  },
}, {collection: 'participants'});

const Participant = mongoose.model("Participant", ParticipantSchema);

export default Participant;