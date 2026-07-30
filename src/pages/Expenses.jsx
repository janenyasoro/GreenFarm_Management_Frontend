import React from "react";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
  { key: "date_incurred", label: "Date" },
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount", render: (i) => `$${Number(i.amount).toFixed(2)}` },
];

const fields = [
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["seeds", "fertilizer", "labor", "veterinary", "equipment", "other"],
  },
  { name: "description", label: "Description", type: "text" },
  { name: "amount", label: "Amount", type: "number" },
  { name: "date_incurred", label: "Date incurred", type: "date" },
];

const emptyRecord = { category: "seeds", description: "", amount: "", date_incurred: "" };

export default function Expenses() {
  return (
    <Layout title="Expenses">
      <ResourceManager endpoint="/expenses" columns={columns} fields={fields} emptyRecord={emptyRecord} />
    </Layout>
  );
}
