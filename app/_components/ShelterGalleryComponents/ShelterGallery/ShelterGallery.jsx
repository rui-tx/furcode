"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles/index.css";
import ShelterGalleryCard from "../ShelterGalleryCard/ShelterGalleryCard";
import ShelterBanner from "../ShelterBanner/ShelterBanner";

const ShelterGallery = () => {
  const [shelters, setShelters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const fetchShelters = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const ENDPOINT = `api/shelter?page=${currentPage}&limit=10`;
      // const URL_CONFIGURED = `${ENDPOINT}?limit=${sheltersPerPage}&page=${currentPage}&order=DESC`;
      const response = await fetch(ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
        console.log("Não há mais abrigos para carregar. Fim dos dados alcançado.");
      } else {
        setShelters((prevShelters) => {
          const newShelters = data.filter(
            (newShelter) => !prevShelters.some((shelter) => shelter.id === newShelter.id)
          );
          if (newShelters.length === 0) {
            console.log("Todos os abrigos desta página já foram carregados. Não há novos dados.");
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

  return (
    <div className="shelterGallery-container">
      <div className="ShelterGallery-banner">
        <ShelterBanner/>

        <div className="shelterGallery-search-bar">
          <input
            type="text"
            placeholder="Pesquisar por nome da associação"
            className="input-search-shelter"
            onChange={handleSearchChange}
          ></input>
        </div>
      </div>

      <div className="shelterGallery-cards">
        {shelters
          .filter((shelter) => {
            return search.toLowerCase === ""
              ? shelter
              : shelter.name.toLowerCase().includes(search);
          })
          .map((shelter) => (
            <ShelterGalleryCard key={shelter.id} shelter={shelter} />
          ))}
      </div>
      <div className="sentinel"></div>
    </div>
  );
};

export default ShelterGallery;
