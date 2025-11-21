"use client";

import { useState, useEffect } from "react";
import { ComboBox }  from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table";
import { Button } from "@/components/ui/button";
import { Delete, Edit } from "lucide-react";

type TableRow = {
  id: number;
  Name: string;
  Class: string;
  Quantity: number;
};

const MAX_PEOPLE = 50;

export default function TablesPage() {

  const categories = [
    { value: "vip", label: "VIP Table" },
    { value: "a", label: "Class A Table" },
    { value: "b", label: "Class B Table" },
    { value: "c", label: "Class C Table" },
    { value: "d", label: "Class D Table" },
    { value: "e", label: "Class E Table" },
    { value: "f", label: "Class F Table" },
  ];

  const headers = ["Name", "Class", "Quantity", "Edit", "Delete"];

  const [rows, setRows] = useState<TableRow[]>([]);
  const [selectedClass, setSelectedClass] = useState(() => localStorage.getItem("selectedClass") || "");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [warning, setWarning] = useState("");

  // FILTER STATE
  const [filterClass, setFilterClass] = useState("");

  useEffect(() => {
    localStorage.setItem("selectedClass", selectedClass);
  }, [selectedClass]);

  const formatQuantity = (q: string | number) => {
    const num = Number(q);
    if (isNaN(num) || num < 0) return "00";
    return num < 10 ? `0${num}` : `${num}`;
  };

  const addRow = () => {
    if (!selectedClass) return setWarning("الرجاء اختيار فئة للطاولة!");
    if (!name.trim()) return setWarning("الرجاء إدخال اسم الطاولة!");

    const qtyNum = Number(quantity);
    if (!quantity || isNaN(qtyNum) || qtyNum < 1 || qtyNum > MAX_PEOPLE) {
      return setWarning(`الرجاء إدخال عدد صحيح بين 1 و ${MAX_PEOPLE}`);
    }

    const newRow: TableRow = {
      id: Date.now(),
      Name: name,
      Class: selectedClass,
      Quantity: qtyNum,
    };

    setRows([...rows, newRow]);
    setName("");
    setQuantity("");
    setWarning("");
  };

  const deleteRow = (id: number) => setRows(rows.filter((r) => r.id !== id));

  const editRow = (row: TableRow) => {
    setName(row.Name);
    setSelectedClass(row.Class);
    setQuantity(formatQuantity(row.Quantity));
    deleteRow(row.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addRow();
  };

  const handleComboChange = (val: string) => {
    if (val === selectedClass) return setWarning("تم اختيار نفس الفئة مسبقاً!");
    setSelectedClass(val);
    setWarning("");
  };

  // APPLY FILTER
  const filteredRows = filterClass
    ? rows.filter((r) => r.Class === filterClass)
    : rows;

  const tableRows = filteredRows.map((row) => ({
    Name: row.Name,
    Class: row.Class,
    Quantity: formatQuantity(row.Quantity),
    Edit: (
      <Button variant="ghost" size="sm" onClick={() => editRow(row)}>
        <Edit className="text-green-500 hover:text-green-700" />
      </Button>
    ),
    Delete: (
      <Button variant="ghost" size="sm" onClick={() => deleteRow(row.id)}>
        <Delete className="text-red-500 hover:text-red-700" />
      </Button>
    ),
  }));

  return (
    <div className="p-6 flex flex-col gap-6">

      <h1 className="text-2xl font-bold text-white">Manage Tables</h1>

      {/* Inputs */}
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <ComboBox items={categories}  onChange={handleComboChange} placeholder="اختر فئة..." />

        <Input type="text" placeholder="اسم الطاولة" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyPress} />

        <Input type="number" min={1} max={MAX_PEOPLE} placeholder={`أقصى عدد أفراد (${MAX_PEOPLE})`} value={quantity} onChange={(e) => setQuantity(e.target.value)} onKeyDown={handleKeyPress} />

        <Button onClick={addRow}>Add Table</Button>
      </div>

      {/* Filter */}
      <div className="flex gap-3 items-center">
        <span className="text-white">Filter by class:</span>
        <ComboBox
          items={categories}
         
          onChange={(v) => setFilterClass(v)}
          placeholder="اختر فئة للفلترة"
        />
        <Button variant="secondary" onClick={() => setFilterClass("")}>Reset Filter</Button>
      </div>

      {/* Warning */}
      {warning && <div className="text-yellow-400 font-medium">{warning}</div>}

      {/* Scrollable Table */}
      <div className="overflow-x-auto max-h-[400px]">
        <Table header={headers} row={tableRows} />
      </div>

    </div>
  );
}
