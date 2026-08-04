export default function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-10 left-[8%] h-24 w-24 rounded-3xl bg-pink/40 blur-2xl animate-float-slow" />
      <div className="absolute top-20 right-[10%] h-32 w-32 rounded-full bg-yellow/50 blur-2xl animate-float-med" />
      <div className="absolute bottom-10 left-[15%] h-28 w-28 rounded-full bg-blue/40 blur-2xl animate-float-med" />
      <div className="absolute -bottom-8 right-[20%] h-24 w-24 rounded-3xl bg-brand/30 blur-2xl animate-float-slow" />
      <div className="absolute top-1/3 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-green/40 blur-2xl animate-float-slow" />
    </div>
  );
}
