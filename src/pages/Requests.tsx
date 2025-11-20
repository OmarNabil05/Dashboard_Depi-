// import React from 'react'

import { ButtonGroupInput } from "@/components/Omar_components/SearchBar";
import { ComboBox } from "@/components/ui/combobox";

export default function Requests() {
  return (
    <>
      <div className="flex flex-col lg:flex-row    items-center gap-2 justify-center p-3 " >
   
          <ButtonGroupInput classnameGroup="lg:w-[400px] transition-all duration-300 "  />

        <div className=""><ComboBox classname="w-[150px] lg:w-[200px] transition-all duration-300" placeholder="filter-by"  /></div>

      </div>
    </>
  )
}
