type Filter = {
  key: string;
  label: string;
  color: string;
};

type IndicatorsProps = {
  selected: string;
  onSelect: (key: string) => void;
};

const FILTERS: Filter[] = [
  { key: "featured", label: "Featured", color: "#257CDB" },
  { key: "expired", label: "Expired", color: "#ED0C10" },
  { key: "expiringSoon", label: "Expiring Soon", color: "#FFC700" },
  { key: "neverPromoted", label: "Never Promoted", color: "#E6E6E6" },
  { key: "active", label: "Active", color: "#28a745" },
  { key: "inactive", label: "Inactive", color: "#088F8F" },
];

const Indicators = ({ selected, onSelect }: IndicatorsProps) => (
  <div className="flex h-6 flex-wrap gap-4 bg-white p-0">
    {FILTERS.map(({ key, label, color }) => {
      const isBlurred = selected !== key && selected !== "all";
      return (
        <div
          key={key}
          onClick={() => onSelect(key)}
          className="flex cursor-pointer items-center space-x-2"
        >
          <div
            className={`size-2 rounded-full ${isBlurred ? "opacity-30" : ""}`}
            style={{ backgroundColor: color }}
          />
          <span
            className={`text-sm ${
              isBlurred ? "text-gray-400" : "text-gray-900"
            }`}
          >
            {label}
          </span>
        </div>
      );
    })}
  </div>
);

export default Indicators;
