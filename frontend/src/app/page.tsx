// frontend/app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">🎙️ PodSquad</h1>
      <p className="text-xl text-gray-600 mb-8">Collaborate, Create, Publish Podcasts</p>
      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Login</a>
        <a href="/signup" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50">Signup</a>
      </div>
    </main>
  );
}
