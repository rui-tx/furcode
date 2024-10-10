"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles/index.css";
import ShelterGalleryCard from "../ShelterGalleryCard/ShelterGalleryCard";
import ShelterBanner from "../ShelterBanner/ShelterBanner";
import { useRouter } from "next/navigation";

const ShelterGallery = () => {
  const [shelters, setShelters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const shelterPerPage = 10;

  const fetchShelterImages = async (shelterId) => {
    console.log(`Fetching image for shelter ${shelterId}`);
    try {
      const response = await fetch(
        `/api/download/shelter/${shelterId}/image/cover.jpg`
      );
      console.log(
        `Response status for shelter ${shelterId}: ${response.status}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const { base64, contentType } = data;
      console.log(`Received ${contentType} image for shelter ${shelterId}`);

      const imageUrl = `data:${contentType};base64,${base64}`;
      console.log(
        `Image URL for shelter ${shelterId}:`,
        imageUrl.substring(0, 50) + "..."
      );
      return imageUrl;
    } catch (error) {
      console.error(`Error fetching image for shelter ${shelterId}:`, error);
      return "/path/to/fallback/shelter/image.jpg";
    }
  };

  const fetchShelters = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/shelterGallery?page=${currentPage}&limit=${shelterPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      if (data.length === 0) {
        setHasMore(false);
        console.log(
          "Não há mais abrigos para carregar. Fim dos dados alcançado."
        );
      } else {
        const sheltersWithImages = await Promise.all(
          data.map(async (shelter) => {
            const image = await fetchShelterImages(shelter.id);
            return { ...shelter, image };
          })
        );

        setShelters((prevShelters) => {
          const newShelters = sheltersWithImages.filter(
            (newShelter) =>
              !prevShelters.some((shelter) => shelter.id === newShelter.id)
          );
          if (newShelters.length === 0) {
            console.log(
              "Todos os abrigos desta página já foram carregados. Não há novos dados."
            );
            setHasMore(false);
            return prevShelters;
          }
          return [...prevShelters, ...newShelters];
        });
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Erro ao buscar abrigos:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fetchShelters();
      }
    });
    const sentinel = document.querySelector(".sentinel");
    if (sentinel) {
      intersectionObserver.observe(sentinel);
    }
    return () => {
      intersectionObserver.disconnect();
    };
  }, [fetchShelters]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (id) => {
    router.push(`/shelter/${id}`);
  };

  const filteredShelters = shelters.filter(
    (shelter) =>
      search.toLowerCase() === "" ||
      shelter.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shelterGallery-container">
      <div className="ShelterGallery-banner">
        <ShelterBanner />
        <div className="shelterGallery-search-bar">
          <input
            type="text"
            placeholder="Pesquisar por nome da associação"
            className="input-search-shelter"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="shelterGallery-cards">
        {filteredShelters.map((shelter) => (
          <div
            key={shelter.id}
            className="container-gallery-cards-shelter"
            onClick={() => handleClick(shelter.id)}
          >
            <ShelterGalleryCard
              shelter={{ ...shelter, image: shelter.image }}
            />
          </div>
        ))}
      </div>
      {hasMore && <div className="sentinel"></div>}
      {loading && <p>Carregando mais abrigos...</p>}
    </div>
  );
};

export default ShelterGallery;
