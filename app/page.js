import Logo from "@/components/navbar/Logo";
import ThemeToggle from "./theme-toggle";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-surface border-b border-border p-6 flex justify-between items-center">
        <div>
          <Logo />
          <p className="text-muted">Sharing thoughts and stories</p>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example Blog Cards */}
        {[1, 2, 3].map((post) => (
          <div
            key={post}
            className="bg-surface border border-border rounded-lg shadow hover:shadow-md shadow-border transition-shadow"
          >
            <img
              src={`https://picsum.photos/seed/${post}/600/300`}
              alt="Post Thumbnail"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Blog Post {post}</h2>
              <p className="text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <a
                href="#"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* Actions Section */}
      <section className="p-6 border-t border-border bg-surface flex gap-4 flex-wrap">
        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded">
          Primary Action
        </button>

        <button className="bg-success hover:bg-success-hover text-white px-4 py-2 rounded">
          Publish
        </button>

        <button className="bg-warning hover:bg-warning-hover text-white px-4 py-2 rounded">
          Draft
        </button>

        <button className="bg-danger hover:bg-danger-hover text-white px-4 py-2 rounded">
          Delete
        </button>
      </section>
    </div>
  );
}
