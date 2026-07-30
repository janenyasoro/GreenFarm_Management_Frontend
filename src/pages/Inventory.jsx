// src/pages/Inventory.jsx
import React from "react";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
  { key: "item_name", label: "Item Name" },
  { key: "category", label: "Category" },
  { key: "quantity", label: "Quantity" },
  { key: "unit", label: "Unit" },
  { key: "reorder_level", label: "Reorder Level" },
];

const fields = [
  {
    name: "item_name",
    label: "Item Name",
    type: "text",
    required: true
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["seeds", "fertilizer", "feed", "tools", "equipment", "other"],
    required: false
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    required: false
  },
  {
    name: "unit",
    label: "Unit",
    type: "select",
    options: ["kg", "g", "liters", "pieces", "bags", "bottles"],
    required: false
  },
  {
    name: "reorder_level",
    label: "Reorder Level",
    type: "number",
    required: false
  },
];

const emptyRecord = {
  item_name: "",
  category: "",
  quantity: 0,
  unit: "",
  reorder_level: 0,
};

export default function Inventory() {
  return (
    <Layout title="Inventory">
      <ResourceManager
        endpoint="/inventory"
        columns={columns}
        fields={fields}
        emptyRecord={emptyRecord}
      />
    </Layout>
  );
}