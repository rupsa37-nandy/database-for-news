import Curation from "../models/curationmodel";

// Save curated news
export const save = async (data: any) => {
  try {
  
    // 1. Check for required fields based on your schema
    if (!data.id || !data.query || !data.category) {
        throw new Error("Missing required fields: 'query' and 'category'.");
    }

    // 2. Create a new document with the correct fields
    const newCuration = new Curation({
      id: data.id,
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