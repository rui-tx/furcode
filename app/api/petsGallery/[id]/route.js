import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function GET({params}) {

  const { id } = params; 

  const url = `${API_BASE_URL}/shelter/${id}/allPets`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to fetch pet" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in pet", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }



























  // const pets = [
  //   {
  //     id: 1,
  //     name: "Max",
  //     image:
  //       "https://www.caonosso.pt/wp-content/uploads/2021/01/Labrador-Retriever-3.jpg.webp",
  //     description: "Energético e amoroso",
  //     age: 2,
  //     breed: "Labrador",
  //   },
  //   {
  //     id: 2,
  //     name: "Luna",
  //     image:
  //       "https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1678934108.5188236/everything-you-need-to-know-about-siamese-cats.png",
  //     description: "Calma e carinhosa",
  //     age: 3,
  //     breed: "Siamês",
  //   },
  //   {
  //     id: 3,
  //     name: "Rocky",
  //     image:
  //       "https://www.veterinaria-atual.pt/wp-content/uploads/sites/4/2017/06/bulldog-franc%C3%AAs-Veterin%C3%A1ria-Atual-.jpg",
  //     description: "Brincalhão e leal",
  //     age: 1,
  //     breed: "Bulldog",
  //   },
  //   {
  //     id: 4,
  //     name: "Mia",

  //     image:
  //       "https://blog-static.petlove.com.br/wp-content/uploads/2018/04/persa.png",
  //     description: "Independente e curiosa",
  //     age: 4,
  //     breed: "Persa",
  //   },
  //   {
  //     id: 5,
  //     name: "Buddy",
  //     image:
  //       "https://www.pdsa.org.uk/media/7646/golden-retriever-gallery-2.jpg?anchor=center&mode=crop&quality=100&height=500&bgcolor=fff&rnd=133020229510000000",
  //     description: "Amigável e protetor",
  //     age: 5,
  //     breed: "Golden Retriever",
  //   },
  //   {
  //     id: 6,
  //     name: "Max",
  //     image:
  //       "https://www.caonosso.pt/wp-content/uploads/2021/01/Labrador-Retriever-3.jpg.webp",
  //     description: "Energético e amoroso",
  //     age: 2,
  //     breed: "Labrador",
  //   },
  //   {
  //     id: 7,
  //     name: "Luna",
  //     image:
  //       "https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1678934108.5188236/everything-you-need-to-know-about-siamese-cats.png",
  //     description: "Calma e carinhosa",
  //     age: 3,
  //     breed: "Siamês",
  //   },
  //   {
  //     id: 8,
  //     name: "Rocky",
  //     image:
  //       "https://www.veterinaria-atual.pt/wp-content/uploads/sites/4/2017/06/bulldog-franc%C3%AAs-Veterin%C3%A1ria-Atual-.jpg",
  //     description: "Brincalhão e leal",
  //     age: 1,
  //     breed: "Bulldog",
  //   },
  //   {
  //     id: 9,
  //     name: "Mia",

  //     image:
  //       "https://blog-static.petlove.com.br/wp-content/uploads/2018/04/persa.png",
  //     description: "Independente e curiosa",
  //     age: 4,
  //     breed: "Persa",
  //   },
  //   {
  //     id: 10,
  //     name: "Buddy",
  //     image:
  //       "https://www.pdsa.org.uk/media/7646/golden-retriever-gallery-2.jpg?anchor=center&mode=crop&quality=100&height=500&bgcolor=fff&rnd=133020229510000000",
  //     description: "Amigável e protetor",
  //     age: 5,
  //     breed: "Golden Retriever",
  //   },
  // ];

  
}
