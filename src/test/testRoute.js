import { Router } from "express";
import Stop from '../models/Stop.js';
import Route from '../models/Route.js';
import Trip from '../models/Trip.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import Subscription from '../models/Subscription.js';
import Payment from '../models/Payment.js';


const router = Router();
// Define your test routes here
router.get("/go", (req, res) => {
  res.json({ message: "Test route is working!" });
});


router.get("/mydb", async (req, res) => {
  try{
    const stops = await Stop.find().limit(5);
    const routes = await Route.find().limit(5);
    const trips = await Trip.find().limit(5);
    const users = await User.find().limit(5);
    const tickets = await Ticket.find().limit(5);
    const subscriptions = await Subscription.find().limit(5);
    const payments = await Payment.find().limit(5);

    res.json({ stops, routes, trips, users, tickets, subscriptions, payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;