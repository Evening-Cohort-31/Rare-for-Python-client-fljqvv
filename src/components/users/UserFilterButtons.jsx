import { Button } from "../../design";

const FILTERS = [
  { key: "all", label: "All Users" },
  { key: "active", label: "Active Users" },
  { key: "inactive", label: "Inactive Users" },
  { key: "authors", label: "Authors" },
  { key: "admins", label: "Admins" },
];

export const UserFilterButtons = ({ activeFilter, onFilterChange }) => (
  <div className="level-item">
    <div className="buttons">
      {FILTERS.map(({ key, label }) => (
        <Button
          key={key}
          color="info"
          variant={activeFilter === key ? "outlined" : undefined}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </Button>
      ))}
    </div>
  </div>
);
