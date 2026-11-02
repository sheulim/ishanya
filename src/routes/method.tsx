import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/method")({
  head: () => ({
    meta: [
      { title: "How a morning is chosen \u2014 Ishanya" },
      {
        name: "description",
        content: "The astronomical rules behind Ishanya's forward list of Vastu mornings, based on Hyderabad sunrise.",
      },
    ],
  }),
  component: MethodPage,
});

function MethodPage() {
  return (
    <Shell>
      <p className="text-sm text-forest">Method</p>
      <h1 className="mt-2 font-display text-4xl text-forest">How a morning is accepted</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Nothing on the Muhurta desk is a copied year-table. Each visit asks for today onward, for the city
        you picked \u2014 Hyderabad, unless you change it \u2014 and builds tithi, nakshatra, yoga and the daytime
        windows from the Sun and the Moon.
      </p>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-display text-2xl">Place and future only</h2>
        <p className="mt-2 text-ink-soft">
          Sunrise and sunset are computed for the city\u2019s latitude and longitude. The day is then split into
          eight equal parts (Rahu, Yamaganda, Gulika) and fifteen muhurtas (Abhijit is the eighth). A date
          before today in Indian Standard Time is dropped. If today\u2019s window has already ended, the day is
          kept only as a note, not as a morning you can still use.
        </p>
      </section>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-display text-2xl">What is read in the sky</h2>
        <ul className="mt-2 list-disc pl-5 text-ink-soft">
          <li>Tithi is the Moon\u2019s elongation from the Sun, twelve degrees each. Ayanamsha cancels out, so a Lahiri or tropical zodiac gives the same tithi.</li>
          <li>Nakshatra and yoga use sidereal longitude: tropical longitude minus Lahiri ayanamsha. The zero point follows the usual Chitrapaksha constant, about 23\u00b051\u2032 at the year 2000, plus precession.</li>
          <li>The score uses the tithi current at the suggested start. Sunrise can still be the previous tithi. When that happens, the desk says so and tells you not to begin early.</li>
          <li>The lunar month is amanta: new moon to new moon. Its name is the solar sign the Sun enters during that fortnight-pair. A month with no solar entry is adhika, and these rites wait.</li>
          <li>The sixty-year name changes at the Chaitra new moon, the lunar month in which the Sun enters Mesha.</li>
          <li>A lunar or solar eclipse whose peak falls on that civil day is marked. Penumbral eclipses are a caution. Partial and total ones block the day.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">What blocks a day</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border border-line px-2 py-2">Bar</th>
                <th className="border border-line px-2 py-2">Why it is here</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Amavasya at the working hour", "New moon is not used for these starts."],
                ["Rikta tithi \u2014 4, 9 or 14", "The classical empty tithis, in either paksha."],
                ["Vishti over every clear window", "Bhadra is not used to light the fire."],
                ["Adhika month", "The extra lunar month is left alone."],
                ["Hard eclipse", "The civil day of a partial or total eclipse is left alone."],
                ["No twenty-minute window", "Rahu, Yamaganda and Gulika have covered the good choghadiyas."],
                ["Tuesday, for a well", "Breaking ground for water is not started on Tuesday."],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="border border-line px-2 py-2 font-medium">{row[0]}</td>
                  <td className="border border-line px-2 py-2 text-ink-soft">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-display text-2xl">What only lowers a day</h2>
        <p className="mt-2 text-ink-soft">
          Preferred stars are Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, Uttara Phalguni, Hasta, Chitra,
          Swati, Anuradha, Uttara Ashadha, Shravana, Dhanishta, Uttara Bhadrapada and Revati. Bharani, Krittika,
          Ardra, Ashlesha, Magha, Jyeshtha and Mula stay capped at a thin day. Monday, Wednesday, Thursday and
          Friday help. Tuesday and Saturday hurt. Krishna paksha cannot be a strong day for entry, the first
          stone, or a shop. Panchaka \u2014 Dhanishta from the third pada through Revati \u2014 is a caution unless you
          turn strict mode on. A weak janma tara is applied only if you enter a birth star.
        </p>
        <p className="mt-3 text-ink-soft">
          Abhijit is offered when it is clear, except on Wednesday, when many priests do not take it. Otherwise
          the earliest clear Amrit, Shubh or Labh stretch of at least twenty minutes is the start.
        </p>
      </section>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-display text-2xl">What this desk will not pretend to know</h2>
        <p className="mt-2 text-ink-soft">
          It does not cast a birth chart. It does not apply the family\u2019s sutra, latta, or the priest\u2019s private
          count of ahutis. Venus and Jupiter close to the Sun are flagged as approximate asta, not as a final
          ban. A printed panchang for another city, or one that knots Lahiri a few arcminutes differently, can
          move a boundary by minutes. Near those minutes, ask the person who will sit the fire.
        </p>
      </section>
    </Shell>
  );
}
