import { Link, useRouterState } from "@tanstack/react-router";

const LINKS = [
  { to: "/", label: "Desk" },
  { to: "/vidhi", label: "Vidhi" },
  { to: "/samagri", label: "Samagri" },
  { to: "/mandala", label: "Mandala" },
  { to: "/muhurta", label: "Dates" },
  { to: "/method", label: "Method" },
] as const;

function onPath(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="no-print border-b border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
          <Link to="/" className="block min-h-11">
            <span className="font-display text-2xl leading-none text-forest">Ishanya</span>
            <span className="mt-1 block text-sm text-muted">House rites, and the mornings fit for them</span>
          </Link>
          <nav className="flex gap-1 overflow-x-auto" aria-label="Sections">
            {LINKS.map((link) => {
              const on = onPath(path, link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    on
                      ? "inline-flex min-h-11 items-center rounded-md bg-forest px-3 text-sm text-paper"
                      : "inline-flex min-h-11 items-center rounded-md px-3 text-sm text-ink-soft"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      <footer className="border-t border-line">
        <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
          Ishanya is a householder’s working aid. It is not a personal horoscope, not medical or legal advice,
          and not a substitute for the priest who sits the fire. A rite does not move a door, cure an illness,
          or make a cracked beam safe. Near a tithi boundary, a printed pañcāṅga for another city can differ by
          minutes.
        </p>
      </footer>
    </div>
  );
}
