import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black px-4">
      <h1 className="text-9xl font-extrabold text-red-700 dark:text-red-700 mb-6 select-none">
        404
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-md">
        Oops! The page you&apos;re looking for cannot be found.
      </p>
      <Link href="/">
        <p className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition">
          Back to Home
        </p>
      </Link>
    </div>
  );
}
