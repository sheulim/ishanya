import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { chapters, type Block } from "@/lib/vidhi";

export const Route = createFileRoute("/vidhi")({
  head: () => ({
    meta: [
      { title: "Vastu Shanti, in working order — Ishanya" },
      {
        name: "description",
        content: "One house order for Vastu Shanti: seats, vow, mandala, fire counts, and what is lifted the next morning.",
      },
    ],
  }),
  component: VidhiPage,
});

function VidhiPage() {
  return (
    <Shell>
      <p className="text-sm text-forest">Working order</p>
      <h1 className="mt-2 font-display text-4xl text-forest">Vastu Shanti</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        One order a household can follow with their own priest. Where his shakha differs, his shakha wins.
        The mornings themselves are on the Dates page, for the city where the fire will sit.
      </p>
      <div className="no-print mt-4 flex gap-2 overflow-x-auto">
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-line px-3 text-sm">
            {chapter.kicker}
          </a>
        ))}
        <button type="button" className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-line px-3 text-sm" onClick={() => window.print()}>
          Print this order
        </button>
      </div>
      {chapters.map((chapter) => (
        <article key={chapter.id} id={chapter.id} className="mt-10 max-w-3xl scroll-mt-6 border-t border-line pt-6">
          <p className="text-sm text-muted">{chapter.kicker}</p>
          <h2 className="font-display text-3xl text-forest">{chapter.title}</h2>
          <p className="mt-2 text-ink-soft">{chapter.lede}</p>
          <div className="mt-4 flex flex-col gap-4">
            {chapter.blocks.map((block, index) => (
              <BlockView key={`${chapter.id}-${index}`} block={block} />
            ))}
          </div>
        </article>
      ))}
    </Shell>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "p") return <p>{block.text}</p>;
  if (block.kind === "h") return <h3 className="font-display text-xl">{block.text}</h3>;
  if (block.kind === "note") return <p className="border-l-4 border-forest pl-4 text-ink-soft">{block.text}</p>;
  if (block.kind === "list") {
    return (
      <ul className="list-disc pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.kind === "steps") {
    return (
      <ol className="list-decimal pl-5">
        {block.items.map((item) => (
          <li key={item.title} className="mt-2">
            <span className="font-medium">{item.title}. </span>
            {item.text}
          </li>
        ))}
      </ol>
    );
  }
  if (block.kind === "mantra") {
    return (
      <figure className="rounded-md border border-line bg-paper-deep p-4">
        <p className="text-lg">{block.sa}</p>
        <p className="mt-2 text-sm text-ink-soft">{block.ia}</p>
        <figcaption className="mt-2 text-sm text-muted">
          {block.sense}
          {block.count ? ` ${block.count}` : ""}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-sm text-muted">{block.caption}</p>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {block.headers.map((header) => (
              <th key={header} className="border border-line px-2 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell) => (
                <td key={cell} className="border border-line px-2 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
