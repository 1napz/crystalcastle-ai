// app/dashboard/page.tsx
import { Suspense } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}

async function DashboardContent() {
  try {
    const data = await getData();
    return (
      <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  } catch (error) {
    return (
      <div className="text-red-500 font-medium">
        ⚠️ Error loading dashboard data. Please try again later.
      </div>
    );
  }
}

function Loading() {
  return (
    <div className="animate-pulse text-gray-400">
      Loading dashboard data...
    </div>
  );
}
