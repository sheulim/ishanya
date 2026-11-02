import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const SITTINGS = [
  { hash: "before", kicker: "Before", title: "Fix the morning, then clear the house" },
  { hash: "room", kicker: "Floor", title: "Where the cloth, the pots and the fire sit" },
  { hash: "vow", kicker: "First", title: "Purity, breath, and the vow" },
  { hash: "land", kicker: "Second", title: "Earth, the cow if she can come, the guardians" },
  { hash: "mandala", kicker: "Third", title: "Eighty-one squares and the nine planets" },
  { hash: "fire", kicker: "Fourth", title: "A fire a house can actually finish" },
  { hash: "seal", kicker: "Fifth", title: "Bali, water, a gourd on the door" },
  { hash: "after", kicker: "After", title: "What is lifted the next morning" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ishanya — Vastu mornings" },
      {
        name: "description",
        content: "A householder's order for Vastu Shanti, and the upcoming mornings in Hyderabad fit to begin it.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <p className="text-sm text-forest">A householder’s desk</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl text-forest sm:text-5xl">
        The rite, written in the order a family can follow.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Ishanya keeps one working order for Vastu Shanti — samagri, the eighty-one squares, and the fire —
        and a forward list of mornings. Sunrise, Rahu and Abhijit are calculated for Hyderabad unless you
        choose another city. Days already gone are not shown.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/muhurta"
          search={{ place: "hyderabad", rite: "vastu-shanti", strict: false, span: 180, yajamana: null, spouse: null, day: null }}
          className="inline-flex min-h-11 items-center rounded-md bg-forest px-4 text-sm text-paper"
        >
          Upcoming mornings
        </Link>
        <Link to="/vidhi" className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm">
          The working order
        </Link>
      </div>
      <ol className="mt-10 border-t border-line">
        {SITTINGS.map((sitting, index) => (
          <li key={sitting.hash} className="border-b border-line">
            <Link to="/vidhi" hash={sitting.hash} className="flex min-h-11 items-baseline gap-4 py-3">
              <span className="w-8 font-display text-xl text-copper">{index + 1}</span>
              <span>
                <span className="block text-xs text-muted">{sitting.kicker}</span>
                <span className="text-lg">{sitting.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link to="/samagri" className="rounded-md border border-line bg-paper-deep p-4">
          <span className="block font-display text-xl text-forest">Samagri</span>
          <span className="mt-1 block text-sm text-ink-soft">A shopping list you can tick, scaled for one house fire.</span>
        </Link>
        <Link to="/mandala" className="rounded-md border border-line bg-paper-deep p-4">
          <span className="block font-display text-xl text-forest">Mandala</span>
          <span className="mt-1 block text-sm text-ink-soft">All eighty-one squares, north up, each deity named.</span>
        </Link>
        <Link to="/method" className="rounded-md border border-line bg-paper-deep p-4">
          <span className="block font-display text-xl text-forest">Method</span>
          <span className="mt-1 block text-sm text-ink-soft">How a morning is accepted or set aside. No hidden table.</span>
        </Link>
      </div>
    </Shell>
  );
}
