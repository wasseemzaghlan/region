export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Region Management System
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Manage your regions, counties, and cities with ease
        </p>
        <div className="mt-10">
          <a
            href="/regions"
            className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </main>
  );
}