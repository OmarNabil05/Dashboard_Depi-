import { useEffect, useState } from "react";
import Filter from "@/components/Omar_components/Filter";
import Table from "@/components/ui/Table";

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

export default function Requests() {
  const [value, setValue] = useState(""); // category filter
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<
    { [key: string]: React.ReactNode; _id: string; tableCategory: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const header = ["customer", "table", "category", "date", "from", "to", "accept", "reject"];

  const options = [
    { value: "", label: "All" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
  ];

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/reservations");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data: Reservation[] = await res.json();

        const formattedRows = data
          .filter((item) => item.status === "pending") // only pending
          .map((item) => {
            const tableName =
              typeof item.table === "object" && item.table !== null
                ? item.table.name
                : item.table ?? "N/A";
            const tableCategory =
              typeof item.table === "object" && item.table !== null
                ? item.table.category.toUpperCase()
                : "N/A";

            return {
              _id: item._id,
              customer: item.customerName,
              table: tableName,
              tableCategory,
              category: tableCategory,
              date: item.timeStart?.split("T")[0] ?? "N/A",
              from: item.timeStart
                ? new Date(item.timeStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A",
              to: item.timeEnd
                ? new Date(item.timeEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A",
              accept: (
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                  onClick={() => handleStatusChange(item._id, "accepted")}
                >
                  Accept
                </button>
              ),
              reject: (
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleStatusChange(item._id, "refused")}
                >
                  Reject
                </button>
              ),
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

  const handleStatusChange = async (id: string, status: "accepted" | "refused") => {
    try {
      await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setRows((prev) => prev.filter((r) => r._id !== id)); // remove immediately
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRows = rows
    .filter((el) => (value === "" ? true : el.tableCategory.toUpperCase() === value))
    .filter((el) => (search === "" ? true : String(el.customer).toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Filter items={options}  onChangeCombo={(val) => setValue(val)} onChangeInput={(e) => setSearch(e.target.value)} />
      <div className="max-h-[calc(100vh-130px)] overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading...</p>
        ) : (
          <Table header={header} row={filteredRows} />
        )}
      </div>
    </div>
  );
}
