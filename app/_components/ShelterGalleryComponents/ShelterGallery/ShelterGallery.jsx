"use client";
import { useCallback, useEffect, useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import "./styles/index.css";
import ShelterGalleryCard from "../ShelterGalleryCard/ShelterGalleryCard";
import ShelterBanner from "../ShelterBanner/ShelterBanner";

const ShelterGallery = () => {
  const [shelters, setShelters] = useState([]);
  const [displayedShelter, setDisplayedShelters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortBy, setSortBy] = useState("name");
  const sheltersPerPage = 10;

  const fetchShelters = useCallback(async () => {
    try {
      const ENDPOINT = "api/shelter";
      const URL_CONFIGURED = `${ENDPOINT}?limit=${sheltersPerPage}&page=${currentPage}&order=DESC`;
      const response = await fetch(URL_CONFIGURED);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShelters((prevShelters) => [...prevShelters, ...data]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching shelters:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    const sentinel = document.querySelector(".sentinel");
    if (sentinel) {
      intersectionObserver.observe(sentinel);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  const handleSort = () => {
    const sortedShelters = [...shelters].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setShelters(sortedShelters);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "ascending" ? "descending" : "ascending"
    );
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    handleSort();
  }, [sortOrder, sortBy]);

  return (
    <div className="shelterGallery-container">
      <div className="ShelterGallery-banner">
        <ShelterBanner />
      </div>

      <div className="shelterGallery-content">
        <div className="shelterGallery-sort">
          <select onChange={handleSortByChange} value={sortBy}>
            <option value="name">Nome</option>
          </select>
          <button onClick={toggleSortOrder}>
            {sortOrder === "ascending" ? (
              <FaSortDown />
            ) : (
              <FaSortUp />
            )}
          </button>
        </div>

        <div className="shelterGallery-cards">
          {shelters.map((shelter) => (
            <ShelterGalleryCard key={shelter.id} shelter={shelter} />
          ))}
        </div>

        <div className="sentinel"></div>
      </div>
    </div>
  );
};

export default ShelterGallery;
