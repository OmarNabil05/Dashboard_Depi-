import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";


type ButtonGroupProps<T> = {
  classnameGroup?: string;
  classnameInput?: string;
  onClick?: () => void;
  onChange?: (value: T) => void;
};


export function ButtonGroupInput<T>({
  classnameGroup,
  classnameInput,
  onClick,
  onChange,
}: ButtonGroupProps<T>) {
  return (
    <ButtonGroup className={`${classnameGroup}`}>
      <Input
        placeholder="Search..."
        className={`${classnameInput}`}
        onChange={(e) => onChange && onChange(e.target.value as unknown as T)}
      />
      <Button variant="outline" aria-label="Search" onClick={onClick}>
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
