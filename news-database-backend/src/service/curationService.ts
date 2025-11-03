import Curation from "../models/curationmodel";

// Save curated news
export const save = async (data: any) => {
  try {

    // 1. Check for required fields based on your schema
    if (!data.id || !data.user_id || !data.query || !data.category) {
      throw new Error("Missing required fields: 'user_id' , 'query' and 'category'.");
    }

    // 2. Create a new document with the correct fields
    const newCuration = new Curation({
      id: data.id,
      user_id: data.user_id,
      query: data.query,
      category: data.category,
      curated_news: data.curated_news
    });
    console.log("service \n", newCuration);

    // 3. Save the new document to the database
    return await newCuration.save();
  } catch (error: any) {
    console.log("Error in curationService.save:", error);
  }
};

export const updateEditedNewsById = async (id: string, edited_news: string) => {
  try {
   // Find by ID first
  const existing = await Curation.findOne({id});
  if (!existing) return null; // UID does not exist

    const updatedDoc = await Curation.findOneAndUpdate(
      { id: id },                     // match by your unique field name
      { edited_news },                  // set the updated field
      {
        new: true,                     // return the updated document
        upsert: true,                  // create if not found
        setDefaultsOnInsert: true      // apply schema defaults when inserting
      }
    );

    return await updatedDoc.save();

  } catch (error: any) {
    console.error("Service error:", error);
    throw error;
  }
};

export const getCuratedCountByUser = async (user_id: string) => {
  try {
    // Count how many curations exist for this user_id
    const count = await Curation.countDocuments({ user_id });
    return count;
  } catch (error: any) {
    console.error("Error in getCuratedCountByUser service:", error);
    throw error;
  }
};