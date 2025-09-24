import Curation from "../models/curationmodel";

// Save curated news
export const save = async (curated_news: any) => {
  try {
    // 1. Generate a new, unique cid.
    // This is a robust way to generate a unique, incremental ID.
    const count = await Curation.countDocuments();
    const cid = count + 1;

    // 2. Check for required fields based on your schema
    if (!curated_news.query || !curated_news.category) {
        throw new Error("Missing required fields: 'query' and 'category'.");
    }

    // 3. Create a new document with the correct fields
    const newCuration = new Curation({
      cid,
      query: curated_news.query,
      category: curated_news.category,
      title: curated_news.title,
      introduction: curated_news.introduction,
      body: curated_news.body,
      summary: curated_news.summary,
    });

    // 4. Save the new document to the database
    return await newCuration.save();
  } catch (error: any) {
    console.error("Error in curationService.save:", error);
    throw new Error("Database save failed");
  }
};