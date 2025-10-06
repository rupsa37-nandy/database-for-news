import mongoose from "mongoose";

const TranslationSchema = new mongoose.Schema(
    {
    tid: { type: Number, required: true, unique:true},
    src_lang: { type: String, required: true},
    tgt_lang: { type: String, required: true},
    text: { type: String, required: true},// original text
    translations: { type: String, required: true } // translated text
    },
    { timestamps: true }
);

export default TranslationSchema;