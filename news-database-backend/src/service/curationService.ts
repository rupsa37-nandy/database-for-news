import Curation from "../models/curationmodel";

export const save = async (news_reports: string[]) => {
  // Business logic: create curated news object
  const curatedNews = { cid: Date.now(),
                        news_reports,
                        title: "Breaking News: Dummy Expansion",
                        introduction: "...",
                        body: [
                            { heading: "abccc", body: "kjdkw" },
                            { heading: "kjwjcoe 2", body: "djiw" },
                        ],
                        summary: "...",
                    };

  // Store in database
  const saved = await Curation.insertOne(curatedNews);
  return saved; // return data to controller
};
