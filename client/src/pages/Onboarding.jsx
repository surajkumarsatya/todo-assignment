function Onboarding({ onGetStarted }) {
  return (
    <main className="min-h-screen bg-white md:flex md:items-center md:justify-center md:bg-[#F4F5F9] md:p-8">
      <section className="mx-auto flex min-h-screen w-full max-w-275 flex-col overflow-hidden bg-white md:min-h-170 md:flex-row md:shadow-xl">
       
        <div className="relative flex h-[62vh] min-h-100 w-full items-center justify-center overflow-hidden bg-primary md:h-auto md:min-h-170 md:w-[55%]">
          <div className="absolute -right-5 -top-8 h-24 w-24 rounded-full border-14 border-white/10" />
          <svg
            className="absolute left-0 top-[20%] h-28 w-28 text-white/15"
            viewBox="0 0 120 100"
            fill="none"
          >
            <path
              d="M0 15 L15 0 L30 15 L45 0 L60 15 L75 0 L90 15 L105 0 M0 35 L15 20 L30 35 L45 20 L60 35 L75 20 L90 35 L105 20 M0 55 L15 40 L30 55 L45 40 L60 55 L75 40 L90 55 L105 40 M0 75 L15 60 L30 75 L45 60 L60 75 L75 60 L90 75 L105 60"
              stroke="currentColor"
              strokeWidth="6"
            />
          </svg>

          <svg
            className="absolute bottom-[8%] right-0 h-32 w-32 text-white/15 md:bottom-[12%]"
            viewBox="0 0 120 100"
            fill="none"
          >
            <path
              d="M0 15 L15 0 L30 15 L45 0 L60 15 L75 0 L90 15 L105 0 M0 35 L15 20 L30 35 L45 20 L60 35 L75 20 L90 35 L105 20 M0 55 L15 40 L30 55 L45 40 L60 55 L75 40 L90 55 L105 40 M0 75 L15 60 L30 75 L45 60 L60 75 L75 60 L90 75 L105 60"
              stroke="currentColor"
              strokeWidth="6"
            />
          </svg>
          <div className="absolute -bottom-17.5 -left-17.5 h-52 w-52 rounded-full border-18 border-white/10" />
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-8 sm:px-10 md:px-12 md:py-12">

          <div>
            <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-[32px]">
              Manage What To Do
            </h1>

            <p className="mt-4 max-w-85 text-[13px] leading-[1.8] text-muted">
              The best way to manage what you have to do,
              don't forget your plans.
            </p>
          </div>

          <button
            type="button"
            onClick={onGetStarted}
            className="mt-10 flex min-h-12 w-full items-center justify-center bg-primary px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-dark active:scale-[0.99] md:min-h-13"
          >
            Get Started
          </button>

        </div>
      </section>
    </main>
  );
}

export default Onboarding;
