import Curation from "../models/curationmodel";

// Save curated news
export const save = async (data: any) => {
  try {
     // 1.Retrieve the latest translation sorted by tid (descending)
    const lastTranslation = await Curation.findOne().sort({ tid: -1 });

    // 2.Determine the next tid
    const cid = lastTranslation ? lastTranslation.cid + 1 : 1;

    // 2. Check for required fields based on your schema
    if (!data.query || !data.category) {
        throw new Error("Missing required fields: 'query' and 'category'.");
    }

    // 3. Create a new document with the correct fields
    const newCuration = new Curation({
      cid,
      query: data.query,
      category: data.category,
      curated_news: data.curated_news
    });

    // 4. Save the new document to the database
    return await newCuration.save();
  } catch (error: any) {
    console.log("Error in curationService.save:", error);
  }
};

export const saveEditedNews = async (cid: number, editedData: any) => {
  try {
    const updatedCuration = await Curation.findOneAndUpdate(
      { cid: cid },
      { $set: { edited_news: editedData } },
      { new: true, runValidators: true }
    );
    return updatedCuration;
  } catch (error: any) {
    console.error("Error in saveEditedNews service:", error.message);
    throw new Error("Failed to save the edited curation.");
  }
};
