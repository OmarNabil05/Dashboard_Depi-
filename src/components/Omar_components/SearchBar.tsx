import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

type ButtonGroupProps =
{
  classnameGroup? :string , 
  classnameInput? :string  
}


export function ButtonGroupInput( {classnameGroup , classnameInput}:ButtonGroupProps) {
  return (
    <ButtonGroup className={`${classnameGroup}`}>
      <Input placeholder="Search..." className={`${classnameInput}`} />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
