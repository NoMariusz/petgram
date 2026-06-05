import { Link } from 'react-router';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-8 text-[#303330]">
      <section className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-[900px] items-center justify-center py-10">
        <div className="w-full rounded-[34px] bg-[#FFFEFB] px-6 py-10 text-center shadow-[0_12px_32px_rgba(48,51,48,0.08)] sm:px-12">
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#313131]">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-7 text-[#6B625B]">
            The address may be incorrect or the page may have been moved. Go back to Petgram and
            keep exploring.
          </p>

          <div className="mx-auto mt-8 w-full max-w-[260px]">
            <Link
              to="/posts/feed"
              className="flex h-12 w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-5 text-base font-medium tracking-[0.25px] text-[#FFF7F4] shadow-sm transition-all duration-200 hover:brightness-[1.02] hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D5739]/30 focus-visible:ring-offset-2"
            >
              Go to feed
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
