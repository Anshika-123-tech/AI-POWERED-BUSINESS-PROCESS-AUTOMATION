import { Router, Request, Response, RequestHandler } from "express";
import { DemoResponse } from "@shared/api";

const router = Router();

// TEMP STORAGE (later we will replace with DB)
let tickets: any[] = [];

// ✅ CREATE TICKET (WITH n8n INTEGRATION)
router.post("/tickets", async (req: Request, res: Response) => {
  const { name, email, issue_type, message } = req.body;

  // ✅ VALIDATION
  if (!name || !email || !issue_type || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // ✅ CREATE OBJECT
  const newTicket = {
    id: `TKT-${Date.now()}`,
    name,
    email,
    issue_type,
    message,
    status: "open",
    createdAt: new Date(),
  };

  // ✅ STORE IN BACKEND
  tickets.push(newTicket);

  // 🔥 CALL n8n WEBHOOK
  try {
    await fetch("https://n8n18.app.n8n.cloud/webhook/b51b8c46-e4e2-4923-93cb-d8a096cd96ab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    });

    console.log("n8n triggered successfully");
  } catch (error) {
    console.error("Error calling n8n:", error);
  }

  // ✅ SEND RESPONSE
  res.status(201).json({
    success: true,
    ticket_id: newTicket.id,
  });
});

// ✅ GET ALL TICKETS
router.get("/tickets", (req: Request, res: Response) => {
  res.json(tickets);
});

// ✅ OPTIONAL DEMO ROUTE
export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};

export default router;