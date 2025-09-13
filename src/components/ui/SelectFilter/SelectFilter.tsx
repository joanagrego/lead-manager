type Option<T> = {
  label: string;
  value: T | null;
};

type FilterProps<T> = {
  selectValue?: T | null;
  onSelectChange?: (value: T | null) => void;
  selectOptions?: readonly Option<T>[];
};

export const SelectFilter = <T,>({
  selectValue,
  onSelectChange,
  selectOptions = [],
}: FilterProps<T>) => {
  return (
    <div className="flex gap-3 mb-4">
      {selectOptions.length > 0 && onSelectChange && (
        <select
          value={selectValue === null ? "all" : String(selectValue)}
          onChange={(e) => {
            const value = e.target.value;
            onSelectChange(value === "all" ? null : (value as unknown as T));
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {selectOptions.map((opt) => (
            <option 
              key={opt.value === null ? "all" : String(opt.value)} 
              value={opt.value === null ? "all" : String(opt.value)}
            >
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};