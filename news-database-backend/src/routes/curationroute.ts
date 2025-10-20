import { Router } from "express";
import { saveCuratedNews, updateEditedNews } from "../controller/curationController";

const curationRouter = Router();

/**
 * @swagger
 * /curation/save_curated_news:
 *   post:
 *     summary: Save a curated news item
 *     description: Accepts curated news details and stores them in the database.
 *     tags:
 *       - Curation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CurationRequest'
 *     responses:
 *       200:
 *         description: Curated news saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurationSuccessResponse'
 *       400:
 *         description: Invalid or missing data
 *       500:
 *         description: Internal server error
 */
curationRouter.post("/save_curated_news", saveCuratedNews);

/**
 * @swagger
 * /curation/update_edited_news:
 *   put:
 *     summary: Update edited curated news
 *     description: Updates the edited version of a curated news item identified by its unique ID.
 *     tags:
 *       - Curation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - edited_news
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "26268d8a-7688-4aeb-98bf-ae99fe23c7a4"
 *               edited_news:
 *                 type: object
 *                 required:
 *                   - title
 *                   - introduction
 *                   - body
 *                   - summary
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "The AI Paradox: Redefined for 2025"
 *                   introduction:
 *                     type: string
 *                     example: "Updated intro for the edited article..."
 *                   body:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         heading:
 *                           type: string
 *                           example: "A Fresh Perspective"
 *                         body:
 *                           type: string
 *                           example: "This is the new edited section of the article..."
 *                   summary:
 *                     type: string
 *                     example: "Revised version of the AI Paradox summary."
 *     responses:
 *       200:
 *         description: Edited news updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Edited news updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "68ee294f86678261acdabb11"
 *                     id:
 *                       type: string
 *                       example: "26268d8a-7688-4aeb-98bf-ae99fe23c7a4"
 *                     query:
 *                       type: string
 *                       example: "Disease"
 *                     category:
 *                       type: string
 *                       example: "national"
 *                     curated_news:
 *                       $ref: '#/components/schemas/CuratedNewsBody'
 *                     edited_news:
 *                       $ref: '#/components/schemas/CuratedNewsBody'
 *       404:
 *         description: News ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No record found for the given ID."
 *       500:
 *         description: Internal server error
 */
curationRouter.put("/update_edited_news", updateEditedNews);

export default curationRouter;
