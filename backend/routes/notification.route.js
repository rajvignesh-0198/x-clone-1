import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/get_notifications", protectRoute, getNotifications);
router.delete("/delete_notifications", protectRoute, deleteNotifications);

export default router;
