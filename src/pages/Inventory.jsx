import React from "react";
import Layout from "../components/common/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
  { key: "item_name", label: "Item" },
  { key: "category", label: "Category" },
  { key: "quantity", label: "Quantity", render: (i) => `${i.quantity} ${i.unit || ""}` },
  { key: "reorder_level", label: "Reorder level" },
  {
    key: "low_stock",
    label: "Status",
    render: (i) =>
      i.low_stock ? (
        <span className="text-red-600 font-medium">Low stock</span>
      ) : (
        <span className="text-harvest-600">OK</span>
      ),
  },
];

const fields = [
  { name: "item_name", label: "Item name", type: "text" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["seeds", "fertilizer", "feed", "tools", "other"],
  },
  { name: "quantity", label: "Quantity", type: "number" },
  { name: "unit", label: "Unit (kg, bags, liters...)", type: "text" },
  { name: "reorder_level", label: "Reorder level", type: "number" },
];

const emptyRecord = { item_name: "", category: "seeds", quantity: 0, unit: "", reorder_level: 0 };

export default function Inventory() {
  return (
    <Layout title="Inventory">
      <ResourceManager endpoint="/inventory" columns={columns} fields={fields} emptyRecord={emptyRecord} />
    </Layout>
  );
}
