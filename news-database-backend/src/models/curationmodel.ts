import mongoose from "mongoose";
import { Any } from "typeorm";

// Section schema (subdocument/nested json)
const SectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true },
});

const CuratedNewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    body: { type: [SectionSchema], required: true }, // array of sections
    summary: { type: String, required: true },
  },
  { timestamps: true } //automatically adds two fields to your documents(Curation): createdAt and updatedAt
);


const CurationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // unique id for curated news
    query: { type: String, required: true},
    category: { type: String, required: true},
    curated_news: CuratedNewsSchema,
    edited_news: CuratedNewsSchema, //optional
  }
)
// Compiles the CurationSchema into a Model
const Curation = mongoose.model("Curation", CurationSchema);

export default Curation;