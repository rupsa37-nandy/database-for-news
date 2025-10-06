import Translation from "../models/translationmodel";

export const save = async (data: any) => {
  try {
    const { src_lang, tgt_lang, text, bengali_translation, hindi_translation } = data;
    
    if (!src_lang || !tgt_lang || !text) {
        throw new Error("Missing mandatory fields: 'src_lang', 'tgt_lang', or 'text'.");
    }
    
    // Ensure at least one translation is present
    if (!bengali_translation && !hindi_translation) {
        throw new Error("At least one translation ('bengali_translation' or 'hindi_translation') must be provided.");
    }
    
    // Auto-generate tid 
    const tid = Date.now();

    const newTranslation = new Translation({
      tid,
      src_lang: src_lang,
      tgt_lang: tgt_lang,
      text: text, 
      
      // Save the fields as received (will be null/undefined if not provided)
      bengali_translation: bengali_translation, 
      hindi_translation: hindi_translation, 
    });

    const saved = await newTranslation.save();
    return saved;
  } catch (error: any) {
    console.error("Error saving translation:", error.message);
    throw new Error(error.message);
  }
};