import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-screen-xl bg-neutral-950 mx-auto rounded-6xl flex flex-col items-center h-[calc(100vh-2rem)] p-4">
      <span className="text-9xl font-bold mx-auto mt-40 mb-8">404</span>
      <h1 className="text-5xl font-bold text-center mb-8">Page not found</h1>
      <Link
        href="/"
        className=" text-xl font-bold rounded-2xl inline-flex gap-2 hover:bg-neutral-50/10 focus:bg-neutral-600/10 p-4 border border-neutral-600"
      >
        Return Home
      </Link>
    </div>
  );
}
