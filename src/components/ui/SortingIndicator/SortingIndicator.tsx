export const SortingIndicator = ({ direction }: { direction: "asc" | "desc" }) => {
  const icons = {
    asc: {
      icon: (
        <svg
          className="w-3 h-3 fill-current"
          viewBox="0 0 12 12"
          aria-label="Sorted ascending"
        >
          <path d="M6 3L2 7h8L6 3z" />
        </svg>
      ),
      label: "Sorted ascending",
    },
    desc: {
      icon: (
        <svg
          className="w-3 h-3 fill-current"
          viewBox="0 0 12 12"
          aria-label="Sorted descending"
        >
          <path d="M6 9L2 5h8L6 9z" />
        </svg>
      ),
      label: "Sorted descending",
    },
  };

  const { icon, label } = icons[direction];

  return (
    <span
      className="ml-1 inline-flex flex-col items-center justify-center"
      aria-label={label}
    >
      {icon}
    </span>
  );
};
