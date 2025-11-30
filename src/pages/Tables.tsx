"use client";

import { useState, useEffect } from "react";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table";
import { Button } from "@/components/ui/button";
import { Delete, Edit } from "lucide-react";

type TableRow = {
  _id: string;
  name: string;
  category: string;
  maxSeats: number;
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
  const [selectedClass, setSelectedClass] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [warning, setWarning] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tables from API
  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tables");
      if (!res.ok) throw new Error("Failed to fetch tables");
      const data: TableRow[] = await res.json();
      setRows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const formatQuantity = (q: string | number) => {
    const num = Number(q);
    if (isNaN(num) || num < 0) return "00";
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Add new table
  const addRow = async () => {
    if (!selectedClass) return setWarning("الرجاء اختيار فئة للطاولة!");
    if (!name.trim()) return setWarning("الرجاء إدخال اسم الطاولة!");

    const qtyNum = Number(quantity);
    if (!quantity || isNaN(qtyNum) || qtyNum < 1 || qtyNum > MAX_PEOPLE) {
      return setWarning(`الرجاء إدخال عدد صحيح بين 1 و ${MAX_PEOPLE}`);
    }

    try {
      const res = await fetch("http://localhost:5000/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category: selectedClass,
          maxSeats: qtyNum,
        }),
      });

      if (!res.ok) throw new Error("Failed to add table");
      const newTable: TableRow = await res.json();
      setRows([...rows, newTable]);
      setName("");
      setQuantity("");
      setWarning("");
    } catch (err) {
      console.error(err);
      setWarning("Failed to add table.");
    }
  };

  // Delete table
  const deleteRow = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tables/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete table");
      setRows(rows.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Edit table (prefill inputs, then delete from list)
  const editRow = (row: TableRow) => {
    setName(row.name);
    setSelectedClass(row.category);
    setQuantity(String(row.maxSeats));
    setRows(rows.filter((r) => r._id !== row._id));
  };

  // Apply filter
  const filteredRows = filterClass ? rows.filter((r) => r.category === filterClass) : rows;

  const tableRows = filteredRows.map((row) => ({
    Name: row.name,
    Class: row.category.toUpperCase(),
    Quantity: formatQuantity(row.maxSeats),
    Edit: (
      <Button variant="ghost" size="sm" onClick={() => editRow(row)}>
        <Edit className="text-green-500 hover:text-green-700" />
      </Button>
    ),
    Delete: (
      <Button variant="ghost" size="sm" onClick={() => deleteRow(row._id)}>
        <Delete className="text-red-500 hover:text-red-700" />
      </Button>
    ),
  }));

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Manage Tables</h1>

      {/* Inputs */}
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <ComboBox items={categories} onChange={(v) => setSelectedClass(v)} placeholder="اختر فئة..." />
        <Input type="text" placeholder="اسم الطاولة" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          type="number"
          min={1}
          max={MAX_PEOPLE}
          placeholder={`أقصى عدد أفراد (${MAX_PEOPLE})`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button onClick={addRow}>Add Table</Button>
      </div>

      {/* Filter */}
      <div className="flex gap-3 items-center">
        <span className="text-white">Filter by class:</span>
        <ComboBox items={categories} onChange={(v) => setFilterClass(v)} placeholder="اختر فئة للفلترة" />
        <Button variant="secondary" onClick={() => setFilterClass("")}>
          Reset Filter
        </Button>
      </div>

      {/* Warning */}
      {warning && <div className="text-yellow-400 font-medium">{warning}</div>}

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center py-4">Loading...</p>
      ) : (
        <div className="overflow-x-auto max-h-[400px]">
          <Table header={headers} row={tableRows} />
        </div>
      )}
    </div>
  );
}
