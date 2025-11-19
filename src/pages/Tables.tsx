// import React from 'react'

import { ComboBox } from "@/components/Vivian_components/combobox";
import Table from "@/components/Vivian_components/Table";
import { Input } from "@/components/ui/input";

export default function Tables() {
  const categories = [
  { value: "vip", label: "VIP Table" },       // Exclusive / private / luxury
  { value: "a", label: "Class A Table" },    // Premium / best location
  { value: "b", label: "Class B Table" },    // Very good tables
  { value: "c", label: "Class C Table" },    // Standard tables
  { value: "d", label: "Class D Table" },    // Small or side tables
  { value: "e", label: "Class E Table" },    // Less desirable location
  { value: "f", label: "Class F Table" },    // Budget / last choice spots
];
const headers = ["Name", "Class", "Quantity" ];

  const rows = [
    { Name: "table1" ,Class:"A" , Quantity:"1" },
    { Name: "table2" ,Class:"A" , Quantity:"1" },
    { Name: "table3" ,Class:"A" , Quantity:"1" },
    { Name: "table4" ,Class:"A" , Quantity:"1" },
  ];

  const footer = [
    { Name: "Total Tables", Class: "", Quantity: rows.length },
  ];
  return (
    <div>
      <div className="flex flex-col ">
      <ComboBox items={categories}
        placeholder="اختر فئة..."/>
        <Input type="text" placeholder="اسم الطاولة" required/>
        <Input type="number" min={1} max={50} placeholder="اقصى عدد افراد" required/>
        <Table header={headers} row={rows} footer={footer}/>


        </div>
    </div>
  )
}
