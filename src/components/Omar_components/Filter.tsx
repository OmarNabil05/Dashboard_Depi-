import { ComboBox } from "../ui/combobox";
import { Input } from "../ui/input";

interface ComboItem {
  value: string;
  label: string;
}

type FilterProps = {
  onChangeInput?: (value: string) => void;
  onChangeCombo?: (value: string) => void; // fixed to string
  items?: ComboItem[];
};

export default function Filter({
  onChangeInput,
  onChangeCombo,
  items = [],
}: FilterProps) {
  return (
    <div className="flex gap-2">
      <Input
        className="w-[300px] lg:w-[400px] transition-all duration-300"
        placeholder="Search..."
        onChange={(e) => onChangeInput && onChangeInput(e.target.value)}
      />
      <ComboBox
        classname="w-[200px] transition-all duration-300"
        placeholder="filter-by"
        items={items}
        onChange={onChangeCombo} // now type matches string
      />
    </div>
  );
}
