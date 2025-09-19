import dotenv from "dotenv";
import apps from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

apps.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
