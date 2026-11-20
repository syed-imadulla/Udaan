import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Table, { type Column } from "../components/Table";

interface DemoRow extends Record<string, unknown> {
  id: number;
  name: string;
  role: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showEmptyTable, setShowEmptyTable] = useState(false);

  const sampleData: DemoRow[] = [
    { id: 1, name: "Alice", role: "Frontend" },
    { id: 2, name: "Bob", role: "Backend" },
  ];

  const columns: Column<DemoRow>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
  ];

  function handleInputChange(val: string) {
    setName(val);
    if (!val.trim()) {
      setError("Name cannot be empty");
    } else {
      setError("");
    }
  }

  function toggleLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hackathon Starter</h1>

      <Card title="Component Showcase" description="Demonstrating all 5 core UI components">
        <div className="space-y-6">
          {/* Input component with error state */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">1. Input Component</h2>
            <div className="max-w-sm space-y-2">
              <Input
                label="Your Name"
                placeholder="Enter name (clear to see error)"
                value={name}
                error={error}
                helperText="Type to test input, clear to trigger validation error."
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          </div>

          {/* Button component with normal, loading, and variant states */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">2. Button Component</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={toggleLoading} loading={loading}>
                {loading ? "Loading..." : "Click to Load (1.5s)"}
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
            </div>
          </div>

          {/* Table component with data and empty state toggle */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase text-gray-500">3. Table Component</h2>
              <Button
                variant="secondary"
                className="text-xs py-1 px-2"
                onClick={() => setShowEmptyTable(!showEmptyTable)}
              >
                {showEmptyTable ? "Show Data" : "Show Empty State"}
              </Button>
            </div>
            <Table
              columns={columns}
              data={showEmptyTable ? [] : sampleData}
              emptyMessage="No members found in table (empty state demo)."
            />
          </div>
        </div>
      </Card>

      {/* Modal component */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This modal is fully keyboard friendly! Press <kbd className="rounded border bg-gray-100 px-1.5 py-0.5 text-xs">Esc</kbd> or click outside to close.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => setModalOpen(false)}>Close Modal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
