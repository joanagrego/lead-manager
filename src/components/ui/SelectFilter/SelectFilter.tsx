type Option<T> = {
  label: string;
  value: T;
};

type FilterProps<T> = {
  selectValue?: T;
  onSelectChange?: (value: T) => void;
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
          value={selectValue as unknown as string}
          onChange={(e) => onSelectChange(e.target.value as unknown as T)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {selectOptions.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
