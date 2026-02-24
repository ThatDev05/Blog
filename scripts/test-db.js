
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  } 
});

async function main() {
  try {
    console.log("Connecting...");
    await prisma.$connect();
    console.log("Connected successfully!");
    const count = await prisma.user.count();
    console.log(`User count: ${count}`);
  } catch (e) {
    console.error("Connection failed:", e);
    // Print constructor signature or options if visible? No.
  } finally {
    await prisma.$disconnect();
  }
}

main();
