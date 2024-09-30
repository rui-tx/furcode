import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: 1,
      name: "Max",
      image:
        "https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/activities-fun/10-great-small-dog-breeds/maltese-portrait.jpg",
      adoptionDate: "2023-03-10",
      breed: "Labrador",
    },
    {
      id: 2,
      name: "Bella",
      image:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg",
      adoptionDate: "2023-04-22",
      breed: "Golden Retriever",
    },
  ];

  const headers = [
    { columnName: "id", prettyLabel: "ID", type: "string" },
    { columnName: "name", prettyLabel: "Name", type: "string" },
    { columnName: "image", prettyLabel: "Image", type: "image" },
    {
      columnName: "adoptionDate",
      prettyLabel: "Adoption Date",
      type: "string",
    },
    { columnName: "breed", prettyLabel: "Breed", type: "string" },
  ];

  return NextResponse.json({ data, headers });
}
