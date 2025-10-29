import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchLostItems,
  searchFoundItems,
} from "../../Services/SearchService";
import {
  FaSearch,
  FaRegSadTear,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaPalette,
} from "react-icons/fa";
import "../../LostItemReport.css"; // reuse your existing CSS

const SearchPage = () => {
  const [mode, setMode] = useState("lost"); // 'lost' or 'found'
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // debounce input: update debouncedQuery 400ms after user stops typing
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim()), 400);
    return () => clearTimeout(id);
  }, [query]);

  // perform search whenever mode or debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setNoResults(false);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setNoResults(false);

    const call = mode === "lost" ? searchLostItems : searchFoundItems;

    call(debouncedQuery)
      .then((resp) => {
        const data = resp?.data ?? [];
        setResults(data);
        setNoResults(data.length === 0);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError("Something went wrong while searching.");
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [mode, debouncedQuery]);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    // keep the query - user may want to search same text in other mode
  };

  const handleCardAction = (item) => {
    // Example: navigate to item details or mark as found depending on role
    // Here we'll try to mimic your LostItemReport's behaviour by id and mode
    if (mode === "lost") {
      navigate(`/Found-Redirected/${item.lostItemId}`); // same as mark found flow
    } else {
      // if found item flow exists you can navigate similarly
      navigate(`/FoundItemDetails/${item.foundItemId}`); // change as required
    }
  };

  // small helper to get item id and fields for rendering both Lost and Found items
  const normalizedResults = useMemo(() => {
    return results.map((r) => ({
      id: r.lostItemId ?? r.foundItemId,
      itemName: r.itemName,
      category: r.category,
      color: r.color,
      location: r.location,
      date: r.lostDate ?? r.foundDate,
      username: r.username,
      original: r,
    }));
  }, [results]);

  return (
    <div className="lost-item-page">
      <div
        className="lost-item-header"
        style={{ width: "100%", maxWidth: 1200 }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaSearch size={40} className="text-primary mb-2" />
          <div style={{ textAlign: "left" }}>
            <h2 className="fw-bold text-primary">🔎 Search Lost & Found</h2>
            <p className="text-secondary">
              Search across lost and found reports — try partial words or typos
            </p>
          </div>
        </div>

        {/* Search controls */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select
            value={mode}
            onChange={handleModeChange}
            className="form-select"
            style={{ width: 160, borderRadius: 10 }}
          >
            <option value="lost">Lost Items</option>
            <option value="found">Found Items</option>
          </select>

          <div style={{ position: "relative", width: "min(560px, 80%)" }}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
              placeholder={`Search ${
                mode === "lost" ? "lost" : "found"
              } items — try "ele" or "iphnoe"`}
              style={{ paddingLeft: 16, paddingRight: 48, borderRadius: 12 }}
            />
            <FaSearch
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      </div>

      {/* Results / states */}
      {loading && (
        <div className="text-center mt-4 fs-6 text-muted">Searching...</div>
      )}

      {error && <div className="text-center mt-4 text-danger">{error}</div>}

      {!loading && debouncedQuery && noResults && (
        <div className="text-center py-5">
          <FaRegSadTear size={50} className="text-success mb-3" />
          <p className="fw-semibold text-secondary mb-2 fs-5">No items found</p>
          <p className="text-muted small">
            Try different keywords or check both Lost/Found.
          </p>
        </div>
      )}

      {!loading && normalizedResults.length > 0 && (
        <div
          className="lost-item-grid"
          style={{ width: "100%", maxWidth: 1200 }}
        >
          {normalizedResults.map((item) => (
            <div key={item.id} className="lost-item-card-glow">
              <h4 className="item-title">{item.itemName}</h4>
              <p className="item-id">#{item.id}</p>

              <div className="item-tags">
                <span className="tag category">
                  <FaTag /> {item.category}
                </span>
                <span className="tag color">
                  <FaPalette /> {item.color}
                </span>
              </div>

              <p>
                <FaMapMarkerAlt className="icon" /> <strong>Location:</strong>{" "}
                {item.location}
              </p>
              <p>
                <FaCalendarAlt className="icon" /> <strong>Date:</strong>{" "}
                {item.date}
              </p>
              <p>
                <FaUser className="icon" /> <strong>Reported by:</strong>{" "}
                {item.username}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      <div className="text-end mt-4" style={{ width: "100%", maxWidth: 1200 }}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary btn-sm fw-semibold px-3 py-1"
        >
          RETURN
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
