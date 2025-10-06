import Translation from "../models/translationmodel";

export const save = async (data: any) => {
  try {
    // Auto-generate tid (you can also use a counter or UUID)
    const tid = Date.now();

    const newTranslation = new Translation({
      tid,
      src_lang: data.src_lang,
      tgt_lang: data.tgt_lang,
      text: data.text,
      translations: data.translations,
    });

    const saved = await newTranslation.save();
    return saved;
  } catch (error: any) {
    console.error("Error saving translation:", error.message);
    throw new Error(error.message);
  }
};
