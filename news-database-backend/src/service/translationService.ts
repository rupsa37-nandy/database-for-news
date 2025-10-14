import Translation from "../models/translationmodel";

export const save = async (data: any) => {
  try {
   const { editedNews, hiTranslation, benTranslation } = data;
    
    if (!editedNews) {
        throw new Error("Missing mandatory fields.");
    }
    
    // Ensure at least one translation is present
    if (!benTranslation && !hiTranslation) {
        throw new Error("At least one translation ('bengali_translation' or 'hindi_translation') must be provided.");
    }

    // 1.Retrieve the latest translation sorted by tid (descending)
    const lastTranslation = await Translation.findOne().sort({ tid: -1 });

    // 2.Determine the next tid
    const tid = lastTranslation ? lastTranslation.tid + 1 : 1;

    const newTranslation = new Translation({
      tid,
      editedNews,
      //Save the fields as received (will be null/undefined if not provided)
      hiTranslation: hiTranslation || null,  // missing value becomes null
      benTranslation: benTranslation || null,
    });
    console.log(newTranslation);

    const saved = await newTranslation.save();
    return saved;
  } catch (error: any) {
    console.error("Error saving translation:", error.message);
    throw new Error(error.message);
  }
};