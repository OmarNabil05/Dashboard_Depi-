// import React from 'react'


import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";


import Table from "@/components/ui/Table";
import {  useState } from "react";

export default function Requests() {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  

  const options = [

    {
      value: "A", label: "TABLE CLASS-A"
    },
    {
      value: "B", label: "TABLE CLASS-B"
    },
    {
      value: "C", label: "TABLE CLASS-C"
    },
    {
      value: "D", label: "TABLE CLASS-D"
    },


  ]
  const header = ["customer", "table", "date", "from", "to", "accept", "reject"];

  const row = [
    {
      customer: "Alice Johnson",
      table: "A",
      date: "2025-11-22",
      accept: <button className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>,
      reject: <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
    },
    {
      customer: "Bob Lee",
      table: "D",
      date: "2025-11-23",
      accept: <button className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>,
      reject: <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
    },

  ];

const filteredRows = row
  .filter((element) => (value === "" ? true : element.table === value))
  .filter((element) => (search === "" ? true : element.customer.toLowerCase().includes(search.toLowerCase())));



  return (
    <div className="">
      <header className="flex flex-col lg:flex-row  items-center gap-2 justify-center mb-2 lg:p-3 " >

        <Input className="lg:w-[400px] transition-all duration-300 "onChange={(e) => setSearch(e.target.value)} placeholder="Search.."  />
        <ComboBox classname="w-[200px] transition-all duration-300 " placeholder="filter-by" onChange={(value) => { setValue(value) }} items={options} />

      </header>


      <div className="max-h-[calc(100vh-130px)] overflow-y-auto">
        <Table header={header} row={filteredRows} />
      </div>



    </div>
  )
}
