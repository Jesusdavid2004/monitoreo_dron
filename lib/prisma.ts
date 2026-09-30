import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 *
 * IMPORTANT: the client is only constructed when DATABASE_URL is present.
 * Deployments without a database (demo mode) never touch Prisma: the
 * repositories short-circuit to in-memory data via isDemoMode() before
 * any query runs, so a null client here is never dereferenced.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

function createClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });
}

const client = globalForPrisma.prisma ?? createClient();

export const prisma: PrismaClient =
  client ?? (null as unknown as PrismaClient);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = client;
}