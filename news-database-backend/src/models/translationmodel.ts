import mongoose from "mongoose";

// Section schema (for nested sections)
const SectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true },
});

// Schema for each translated article
const News = new mongoose.Schema({
  title: { type: String, required: true },
  introduction: { type: String, required: true },
  body: { type: [SectionSchema], required: true }, // array of sections
  summary: { type: String, required: true },
});

// Translation schema
const TranslationSchema = new mongoose.Schema(
  {
    tid: { type: Number, required: true, unique: true },
    // src_lang: { type: String, required: true },
    // tgt_lang: { type: String, required: true },
    //editedNews: { type: String, required: true }, // original text

    // store the full translation object for each language
    editedNews: { type: News, required: false },
    hiTranslation: { type: News, required: false },
    benTranslation: { type: News, required: false },
  },
  { timestamps: true }
);

// Model
const Translation = mongoose.model("Translation", TranslationSchema);
export default Translation;
