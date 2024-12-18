import clsx from "clsx";
import Image from "next/image";

/**
 * UI card component to hold body parts
 *
 * @param title The title of the card
 * @param parts Array of body parts
 * @param options State that holds the selected body parts
 * @param handleChange On change handler for checkboxes
 */
export default function BodyCard({ title, parts, options, handleChange }) {
  return (
    <div className="flex flex-col w-full px-4 py-10 rounded-lg shadow-card border gap-2">
      <span className="font-bold text-lg">{title}</span>
      {parts.map((part) => (
        <label
          key={part.name}
          className={clsx(
            "flex flex-row rounded-md gap-4 p-3 items-center shadow-md border border-slate-200",
            {
              "border-slate-600": options.includes(part.name),
            },
          )}
        >
          <Image
            src={part.icon}
            alt={`image of ${part}`}
            width={50}
            height={50}
            className="border-2 border-slate-100 rounded-md"
          />
          <span className="font-bold">{part.name}</span>
          <input
            type="checkbox"
            checked={options.includes(part.name)}
            onChange={() => handleChange(part.name)}
            className="h-4 w-4 accent-black ml-auto"
          />
        </label>
      ))}
    </div>
  );
}
