import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from '../models/Route.js';
import Trip from '../models/Trip.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import Subscription from '../models/Subscription.js';
import Payment from '../models/Payment.js';
import Stop from '../models/Stop.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dereja';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Promise.all([
      Stop.deleteMany(),
      Route.deleteMany(),
      Trip.deleteMany(),
      User.deleteMany(),
      Ticket.deleteMany(),
      Subscription.deleteMany(),
      Payment.deleteMany(),
    ]);
    console.log('Existing data cleared');

    // 1. Create Stops
    const stops = await Stop.insertMany([
      { name: 'Addis Ababa Central', lat: 9.03, lng: 38.74, code: 'AA-CENT' },
      { name: 'Bole Airport', lat: 8.98, lng: 38.80, code: 'BOL-AIR' },
      { name: 'Meskel Square', lat: 9.02, lng: 38.76, code: 'MSQ' }
    ]);
    console.log('Stops created');

    // 2. Create Routes
    const routes = await Route.insertMany([
      { name: 'Airport Express', vehicleType: 'Bus', stops: [stops[0]._id, stops[1]._id], code: 'AE-01' },
      { name: 'City Loop', vehicleType: 'Minibus', stops: [stops[0]._id, stops[2]._id], code: 'CL-01' }
    ]);
    console.log('Routes created');

    // 3. Create Trips
    const trips = await Trip.insertMany([
      { route: routes[0]._id, startTime: '06:00', endTime: '06:45', days: ['Mon','Tue','Wed','Thu','Fri'], vehicleId: 'BUS-101' },
      { route: routes[1]._id, startTime: '07:00', endTime: '08:00', days: ['Sat','Sun'], vehicleId: 'MINI-201' }
    ]);
    console.log('Trips created');

    // 4. Create Users
   const users = await User.insertMany([
  {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    email: 'yohans@example.com',
    password: 'password123',
    role: { User: 2001 },
    favorites: [routes[0]._id]
  },
  {
    firstname: 'Admin',
    lastname: 'User',
    username: 'adminuser',
    email: 'admin@example.com',
    password: 'adminpass',
    role: { Admin: 5001 },
    favorites: []
  }
]);
    console.log('Users created');

    // 5. Create Tickets
    const tickets = await Ticket.insertMany([
      {
        user: users[0]._id,
        trip: trips[0]._id,
        type: 'one-ride',
        price: 20,
        status: 'active',
        validFrom: new Date('2025-09-06T06:00:00Z'),
        validTo: new Date('2025-09-06T23:59:59Z')
      },
      {
        user: users[0]._id,
        trip: trips[1]._id,
        type: 'monthly',
        price: 500,
        status: 'active',
        validFrom: new Date('2025-09-01T00:00:00Z'),
        validTo: new Date('2025-09-30T23:59:59Z')
      }
    ]);
    console.log('Tickets created');

    // 6. Create Subscriptions
    const subscriptions = await Subscription.insertMany([
      {
        user: users[0]._id,
        type: 'monthly',
        startDate: new Date('2025-09-01T00:00:00Z'),
        endDate: new Date('2025-09-30T23:59:59Z'),
        status: 'active'
      },
      {
        user: users[1]._id,
        type: 'yearly',
        startDate: new Date('2025-01-01T00:00:00Z'),
        endDate: new Date('2025-12-31T23:59:59Z'),
        status: 'active'
      }
    ]);
    console.log('Subscriptions created');

    // 7. Create Payments
    await Payment.insertMany([
      {
        user: users[0]._id,
        ticket: tickets[0]._id,
        subscription: null,
        amount: 20,
        method: 'card',
        status: 'completed',
        transactionId: 'TXN1001'
      },
      {
        user: users[0]._id,
        ticket: null,
        subscription: subscriptions[0]._id,
        amount: 500,
        method: 'mobile-money',
        status: 'completed',
        transactionId: 'TXN1002'
      }
    ]);
    console.log('Payments created');

    console.log('✅ Database seeding complete');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  }
};

seedDatabase();
