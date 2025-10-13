import Translation from "../models/translationmodel";

export const save = async (data: any) => {
  try {
   const { editedNews, hiTranslation, benTranslation } = data;
    
    if (!editedNews || !hiTranslation || !benTranslation) {
        throw new Error("Missing mandatory fields: 'src_lang', 'tgt_lang', or 'text'.");
    }
    
    // Ensure at least one translation is present
    if (!benTranslation && !hiTranslation) {
        throw new Error("At least one translation ('bengali_translation' or 'hindi_translation') must be provided.");
    }
    
    // Auto-generate tid 
    //const tid = Date.now();

    // 1. Generate a new, unique cid.
    // This is a robust way to generate a unique, incremental ID.
    const count = await Translation.countDocuments();
    const tid = count + 1;

    const newTranslation = new Translation({
      tid,
      editedNews,
      // Save the fields as received (will be null/undefined if not provided)
      benTranslation, 
      hiTranslation, 
    });

    const saved = await newTranslation.save();
    return saved;
  } catch (error: any) {
    console.error("Error saving translation:", error.message);
    throw new Error(error.message);
  }
};