import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaMock = () => {
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (args: { data?: Record<string, unknown> }) => ({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...(args?.data ?? {}),
    }),
    update: async (args: { data?: Record<string, unknown> }) => args?.data ?? {},
    delete: async () => ({}),
    count: async () => 0,
  };

  return new Proxy({} as PrismaClient, {
    get: (_, prop) => {
      if (prop === "$connect" || prop === "$disconnect") {
        return async () => {};
      }
      return noOp;
    },
  });
};

let prismaInstance: PrismaClient;

try {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || !dbUrl.startsWith("postgres")) {
    console.warn("[AI Studio] DATABASE_URL not configured for postgres — using safe mock");
    prismaInstance = globalThis.prisma || createPrismaMock();
  } else {
    prismaInstance = globalThis.prisma || new PrismaClient();
  }
} catch (e) {
  console.warn("[AI Studio] Database connection error — using safe mock", e);
  prismaInstance = createPrismaMock();
}

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaInstance;
}

export const prisma = prismaInstance;
export default prisma;
