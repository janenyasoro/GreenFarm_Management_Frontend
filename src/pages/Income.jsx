import React from "react";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
  { key: "date_received", label: "Date" },
  { key: "source", label: "Source" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount", render: (i) => `$${Number(i.amount).toFixed(2)}` },
];

const fields = [
  {
    name: "source",
    label: "Source",
    type: "select",
    options: ["crop_sale", "livestock_sale", "other"],
  },
  { name: "description", label: "Description", type: "text" },
  { name: "amount", label: "Amount", type: "number" },
  { name: "date_received", label: "Date received", type: "date" },
];

const emptyRecord = { source: "crop_sale", description: "", amount: "", date_received: "" };

export default function Income() {
  return (
    <Layout title="Income">
      <ResourceManager endpoint="/income" columns={columns} fields={fields} emptyRecord={emptyRecord} />
    </Layout>
  );
}
