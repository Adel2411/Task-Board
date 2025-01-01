import Link from "next/link";

export default function CallToAction() {
  return (
    <section id="get-started" className="py-20 bg-primary dark:bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-80">
          Join thousands of users who are already enjoying the benefits of
          myTaskBoard.
        </p>
        <Link
          href="/auth"
          className="bg-background hover:bg-background/90 dark:bg-background-dark dark:hover:bg-background-dark/90 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:text-primary dark:hover:text-primary-dark transition-shadow duration-200"
        >
          Start Now
        </Link>
      </div>
    </section>
  );
}
