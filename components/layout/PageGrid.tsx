export function PageGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-1"
    >
      <div className="relative mx-auto h-full max-w-[1440] px-6 sm:px-8 lg:px-12">
        <div className="absolute inset-y-0 left-0 w-px bg-border/50" />
        <div className="absolute inset-y-0 right-0 w-px bg-border/50" />
      </div>
    </div>
  );
}
