import { prisma } from "@repo/database";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to LeadLoopr
        </h1>
        <p className="text-gray-600">
          TailwindCSS is now properly configured! 🎉
        </p>
      </div>
    </main>
  );
}
