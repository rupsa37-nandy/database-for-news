import mongoose from "mongoose";

const TranslationSchema = new mongoose.Schema(
  {
    tid: { type: Number, required: true, unique: true },
    src_lang: { type: String, required: true },
    tgt_lang: { type: String, required: true },
    text: { type: String, required: true }, // original text
    bengali_translation: { type: String, required: false }, 
    hindi_translation: { type: String, required: false }, 
  },
  { timestamps: true }
);

// Create model
const Translation = mongoose.model("Translation", TranslationSchema);

export default Translation;
