import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { id: 1, amount: 50, date: "2023-05-15", institution: "Animal Shelter A" },
    { id: 2, amount: 30, date: "2023-06-20", institution: "Pet Rescue B" },
  ];

  const headers = [
    { columnName: "id", prettyLabel: "ID", type: "string" },
    { columnName: "amount", prettyLabel: "Amount", type: "number" },
    { columnName: "date", prettyLabel: "Date", type: "string" },
    { columnName: "institution", prettyLabel: "Institution", type: "string" },
  ];

  return NextResponse.json({ data, headers });
}
