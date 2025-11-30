import { useEffect, useState } from "react";
import Filter from "@/components/Omar_components/Filter";
import Table from "@/components/ui/Table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Reservation {
  _id: string;
  customerName: string;
  table: { _id: string; name: string; category: string } | string | null;
  timeStart: string;
  timeEnd: string;
  status: "pending" | "accepted" | "refused";
  peopleCount: number;
  durationMinutes: number;
}

export default function Logs() {
  const [tableValue, setTableValue] = useState("");
  const [search, setSearch] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [dateSort, setDateSort] = useState("none"); // "asc" | "desc" | "none"
  const [rows, setRows] = useState<
    {
      _id: string;
      customer: string;
      table: string;
      category: string;
      date: string;
      from: string;
      to: string;
      statusText: string;
      status: React.ReactNode;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const tableOptions = [
    { value: "", label: "All" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
  ];

  const statusOptions = [
    { value: "accepted", label: "Accepted" },
    { value: "refused", label: "Rejected" },
  ];

  const dateSortOptions = [
    { value: "none", label: "No Sort" },
    { value: "asc", label: "Date ↑" },
    { value: "desc", label: "Date ↓" },
  ];

  const header = ["customer", "table", "category", "date", "from", "to", "status"];

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/reservations");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data: Reservation[] = await res.json();

        const formattedRows = data
          .filter((item) => item.status === "accepted" || item.status === "refused")
          .map((item) => {
            const tableName =
              typeof item.table === "object" && item.table !== null
                ? item.table.name
                : item.table ?? "N/A";
            const tableCategory =
              typeof item.table === "object" && item.table !== null
                ? item.table.category.toUpperCase()
                : "N/A";
            const statusColor = item.status === "accepted" ? "bg-green-700" : "bg-red-700";

            return {
              _id: item._id,
              customer: item.customerName,
              table: tableName,
              category: tableCategory,
              date: item.timeStart?.split("T")[0] ?? "N/A",
              from: item.timeStart
                ? new Date(item.timeStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A",
              to: item.timeEnd
                ? new Date(item.timeEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A",
              statusText: item.status ?? "unknown",
              status: <span className={`${statusColor} py-1 px-2 rounded`}>{item.status}</span>,
            };
          });

        setRows(formattedRows);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const filteredRows = rows
    .filter((el) => (tableValue === "" ? true : el.category.toUpperCase() === tableValue.toUpperCase()))
    .filter((el) => (search === "" ? true : el.customer.toLowerCase().includes(search.toLowerCase())))
    .filter((el) => {
      if (statusValue === "all") return true;
      return el.statusText?.toLowerCase() === statusValue.toLowerCase();
    });

  // Apply date sort
  const sortedRows =
    dateSort === "none"
      ? filteredRows
      : [...filteredRows].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateSort === "asc" ? dateA - dateB : dateB - dateA;
        });

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-4">
        <Filter
          items={tableOptions}
          onChangeCombo={(val) => setTableValue(val)}
          onChangeInput={(e) => setSearch(e.target.value)}
        />
        <Select value={statusValue} onValueChange={(val) => setStatusValue(val)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateSort} onValueChange={(val) => setDateSort(val)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>
          <SelectContent>
            {dateSortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="max-h-[calc(100vh-130px)] overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading...</p>
        ) : (
          <Table header={header} row={sortedRows} />
        )}
      </div>
    </div>
  );
}
