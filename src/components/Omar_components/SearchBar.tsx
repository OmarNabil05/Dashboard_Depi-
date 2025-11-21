import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

type ButtonGroupProps<T> =
{
  classnameGroup? :string ;
  classnameInput? :string  ;
  onClick?: ()=>void ;
  onChange? : (value :T)=>void;
}


export function ButtonGroupInput( {classnameGroup , classnameInput ,onClick , onChange}:ButtonGroupProps) {
  return (
    <ButtonGroup className={`${classnameGroup}`}>
      <Input placeholder="Search..." className={`${classnameInput}`} onChange={onChange} />
      <Button variant="outline" aria-label="Search" onClick={onClick}>
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
