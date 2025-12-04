import { db } from "./db";
import { users, turfs, teams, bookings, matches, matchInvitations, tournaments } from "@shared/schema";

async function seed() {
  console.log("🌱 Starting seed...");

  try {
    // Create demo users
    const demoUsers = await db.insert(users).values([
      {
        id: "user-1",
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        isAdmin: true,
      },
      {
        id: "user-2",
        email: "captain-a@example.com",
        firstName: "Ahmed",
        lastName: "Khan",
        isAdmin: false,
      },
      {
        id: "user-3",
        email: "captain-b@example.com",
        firstName: "Bruno",
        lastName: "Silva",
        isAdmin: false,
      },
    ]).onConflictDoNothing();

    console.log("✅ Users created");

    // Create demo turfs
    const demoTurfs = await db.insert(turfs).values([
      {
        id: "turf-1",
        name: "Green Field Stadium",
        location: "Downtown",
        address: "123 Main St, City",
        capacity: 22,
        pricePerHour: 50,
        availableHours: "10:00-22:00",
        amenities: "Parking,Lights,Changing Rooms",
        ownerId: "user-1",
      },
      {
        id: "turf-2",
        name: "Sunset Pitch",
        location: "Westside",
        address: "456 West Ave, City",
        capacity: 18,
        pricePerHour: 40,
        availableHours: "15:00-21:00",
        amenities: "Parking,Cafe",
        ownerId: "user-1",
      },
      {
        id: "turf-3",
        name: "Champions Arena",
        location: "Eastside",
        address: "789 East Blvd, City",
        capacity: 28,
        pricePerHour: 60,
        availableHours: "08:00-23:00",
        amenities: "Parking,Lights,Changing Rooms,Cafe,Medical",
        ownerId: "user-1",
      },
    ]).onConflictDoNothing();

    console.log("✅ Turfs created");

    // Create demo teams
    const demoTeams = await db.insert(teams).values([
      {
        id: "team-1",
        name: "Phoenix Rising",
        captainId: "user-2",
        location: "Downtown",
        eloRating: 1450,
        tier: "Gold",
        wins: 12,
        losses: 5,
        draws: 2,
        goalsScored: 48,
        goalsConceded: 22,
        preferredTurfType: "Grass",
      },
      {
        id: "team-2",
        name: "Thunder Strike",
        captainId: "user-3",
        location: "Westside",
        eloRating: 1380,
        tier: "Silver",
        wins: 9,
        losses: 8,
        draws: 3,
        goalsScored: 42,
        goalsConceded: 38,
        preferredTurfType: "Artificial",
      },
      {
        id: "team-3",
        name: "Dragon Squad",
        captainId: "user-1",
        location: "Eastside",
        eloRating: 1520,
        tier: "Platinum",
        wins: 18,
        losses: 3,
        draws: 1,
        goalsScored: 62,
        goalsConceded: 15,
        preferredTurfType: "Grass",
      },
    ]).onConflictDoNothing();

    console.log("✅ Teams created");

    // Create demo bookings
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    await db.insert(bookings).values([
      {
        id: "booking-1",
        turfId: "turf-1",
        userId: "user-2",
        bookingDate: today,
        startTime: "18:00",
        endTime: "19:00",
        totalPrice: 50,
        status: "confirmed",
      },
      {
        id: "booking-2",
        turfId: "turf-2",
        userId: "user-3",
        bookingDate: tomorrow,
        startTime: "17:00",
        endTime: "18:30",
        totalPrice: 60,
        status: "confirmed",
      },
      {
        id: "booking-3",
        turfId: "turf-3",
        userId: "user-2",
        bookingDate: tomorrow,
        startTime: "19:00",
        endTime: "21:00",
        totalPrice: 120,
        status: "pending",
      },
    ]).onConflictDoNothing();

    console.log("✅ Bookings created");

    // Create demo matches
    await db.insert(matches).values([
      {
        id: "match-1",
        teamAId: "team-1",
        teamBId: "team-2",
        turfId: "turf-1",
        scheduledDate: today,
        scheduledTime: "19:00",
        status: "scheduled",
        teamAScore: null,
        teamBScore: null,
      },
      {
        id: "match-2",
        teamAId: "team-2",
        teamBId: "team-3",
        turfId: "turf-3",
        scheduledDate: tomorrow,
        scheduledTime: "20:00",
        status: "scheduled",
        teamAScore: null,
        teamBScore: null,
      },
      {
        id: "match-3",
        teamAId: "team-1",
        teamBId: "team-3",
        turfId: "turf-2",
        scheduledDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        scheduledTime: "18:00",
        status: "pending",
        teamAScore: null,
        teamBScore: null,
      },
    ]).onConflictDoNothing();

    console.log("✅ Matches created");

    // Create demo match invitations
    await db.insert(matchInvitations).values([
      {
        id: "inv-1",
        fromTeamId: "team-1",
        toTeamId: "team-2",
        status: "pending",
      },
      {
        id: "inv-2",
        fromTeamId: "team-3",
        toTeamId: "team-1",
        status: "accepted",
      },
    ]).onConflictDoNothing();

    console.log("✅ Match invitations created");

    // Create demo tournaments
    await db.insert(tournaments).values([
      {
        id: "tournament-1",
        name: "City Championship 2025",
        organizerId: "user-1",
        startDate: tomorrow,
        endDate: new Date(Date.now() + 604800000).toISOString().split("T")[0],
        description: "Annual city-wide football tournament",
        status: "upcoming",
      },
      {
        id: "tournament-2",
        name: "Weekend Warriors Cup",
        organizerId: "user-1",
        startDate: today,
        endDate: tomorrow,
        description: "Quick weekend tournament",
        status: "active",
      },
    ]).onConflictDoNothing();

    console.log("✅ Tournaments created");

    console.log("🎉 Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
