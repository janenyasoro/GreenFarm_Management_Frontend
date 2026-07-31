import Layout from "../components/common/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "date_incurred", label: "Date Incurred" },
];

const fields = [
  { name: "category", label: "Category", type: "select", options: ["seeds", "fertilizer", "labor", "veterinary", "equipment", "other"], required: true },
  { name: "description", label: "Description", type: "text", required: false },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "date_incurred", label: "Date Incurred", type: "date", required: true },
];

const emptyRecord = {
  category: "",
  description: "",
  amount: "",
  date_incurred: "",
};

export default function Expenses() {
  return (
    <Layout>
      <ResourceManager endpoint="/expenses" columns={columns} fields={fields} emptyRecord={emptyRecord} />
    </Layout>
  );
}
