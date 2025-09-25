import mongoose from "mongoose";

const TranslationSchema = new mongoose.Schema(
    {
    tid: { type: Number, required: true, unique:true},
    src_lang: { type: String, required: true},
    tgt_lang: { type: String, required: true},
    text: { type: String, required: true},
    translations: { type: String, required: true},
    },
    { timestamps: true }
);

export default TranslationSchema;