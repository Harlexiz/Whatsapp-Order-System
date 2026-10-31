import React from 'react'


export default function FilterButton() {
  return (
    <div>
      
    </div>
  )
}





function FilterButton({ icon: Icon, label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const active = value !== options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
          active
            ? "border-teal-700 bg-teal-50 text-teal-900"
            : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
        }`}
      >
        <Icon size={16} aria-hidden="true" />
        <span>{active ? value : label}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={opt === value}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-100"
                >
                  {opt}
                  {opt === value && <Check size={14} className="text-teal-700" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}