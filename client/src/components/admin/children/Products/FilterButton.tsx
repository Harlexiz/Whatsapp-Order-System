import { Tag } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  icon: React.ReactNode
  label: string;
  options: FilterOption[];
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const FilterButton = ({label,options,
  value,
  onChange, icon: Icon
}: FilterDropdownProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-300 rounded-lg text-sm min-w-36 hover:bg-gray-50 transition"
      >
        <span>{Icon}</span>
        <span>{selectedOption?.label || label}</span>

        <FaChevronDown
          className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                setIsOpen(false);
                onChange(option.value);
                
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition ${value === option.value
                  ? "bg-gray-100 font-medium"
                  : ""
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;