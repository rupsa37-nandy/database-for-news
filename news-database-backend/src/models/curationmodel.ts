import mongoose from "mongoose";

// Section schema (subdocument/nested json)
const SectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true },
});

// Main schema
const CurationSchema = new mongoose.Schema({
    cid: { type: Number, required: true, unique: true }, // unique id for curated news
    news_reports: { type: [String], required: true},
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    body: { type: [SectionSchema], required: true }, // array of sections
    summary: { type: String, required: true },
  },
  { timestamps: true } //automatically adds two fields to your documents(Curation): createdAt and updatedAt
);

// Compiles the CurationSchema into a Model
const Curation = mongoose.model("Curation", CurationSchema);

export default Curation;
