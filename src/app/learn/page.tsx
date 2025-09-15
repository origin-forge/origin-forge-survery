export default function LearnPage() {
  return (
    <div className="min-h-screen flex bg-[#f7e8c3]">
      {/* Sidebar */}
      <aside className="w-64 min-w-[200px] max-w-xs bg-white border-r border-yellow-300 p-6 flex flex-col gap-6 shadow-lg text-black">
        <h2 className="text-xl font-bold mb-2">Docs</h2>
        <nav className="flex flex-col gap-3 text-base">
          <a href="#overview" className="hover:text-yellow-700 transition">Overview</a>
          <a href="#getting-started" className="hover:text-yellow-700 transition">Getting Started</a>
          <a href="#faq" className="hover:text-yellow-700 transition">FAQ</a>
          <a href="#support" className="hover:text-yellow-700 transition">Support</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <section id="overview" className="mb-10">
          <h3 className="text-2xl font-bold text-yellow-700 mb-2">Overview</h3>
          <p className="text-gray-800 text-lg">Welcome to the OriginForge documentation. Here you can find information about getting started, frequently asked questions, and how to get support.</p>
        </section>
        <section id="getting-started" className="mb-10">
          <h3 className="text-xl font-bold text-yellow-700 mb-2">Getting Started</h3>
          <p className="text-gray-800">Learn how to set up your OriginForge account, connect your gaming profiles, and begin your journey.</p>
        </section>
        <section id="faq" className="mb-10">
          <h3 className="text-xl font-bold text-yellow-700 mb-2">FAQ</h3>
          <p className="text-gray-800">Find answers to common questions about OriginForge, features, and troubleshooting.</p>
        </section>
        <section id="support" className="mb-10">
          <h3 className="text-xl font-bold text-yellow-700 mb-2">Support</h3>
          <p className="text-gray-800">Need help? Reach out to our support team or join the community for assistance.</p>
        </section>
      </main>
    </div>
  );
}
