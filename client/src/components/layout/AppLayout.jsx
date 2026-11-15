
function AppLayout({ children }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto min-h-screen w-full max-w-275 px-5 pb-24 pt-7 sm:px-8 md:px-10 md:py-10">
        {children}
      </div>
    </main>
  );
}

export default AppLayout;
