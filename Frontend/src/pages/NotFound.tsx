import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("[404]", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-16 pt-safe text-foreground sm:py-24">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">Not found</p>
        <h1 className="mt-4 text-5xl font-black tracking-tighter md:text-6xl">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page does not exist or was moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-border bg-card px-6 text-[10px] font-black uppercase tracking-widest text-foreground transition-colors hover:border-primary/40"
          >
            Back to home
          </Link>
          <Link
            to="/signin"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-primary px-6 text-[10px] font-black uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
