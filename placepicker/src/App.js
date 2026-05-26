import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const PLACE_IMAGES = {
  1:  "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80",
  2:  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
  3:  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80",
  4:  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&q=80",
  5:  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
  6:  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
  7:  "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&q=80",
  8:  "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&q=80",
  9:  "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80",
  10: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&q=80",
};

const PLACE_COUNTRIES = ["France","Japan","Indonesia","England","India","Italy","USA","Egypt","Brazil","Thailand"];

// Custom hook — GET request with loading & error state
function useFetch(url, transformFn) {
  const [data, setData]           = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      const json = await res.json();
      setData(transformFn ? transformFn(json) : json);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [url, transformFn]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// Error component
function ErrorMessage({ message, onRetry }) {
  return (
    <div style={styles.errorBox}>
      <span style={styles.errorIcon}>⚠️</span>
      <p style={styles.errorText}>{message}</p>
      {onRetry && <button style={styles.retryBtn} onClick={onRetry}>Retry</button>}
    </div>
  );
}

// Loading spinner
function LoadingSpinner() {
  return (
    <div style={styles.loadingWrap}>
      <div style={styles.spinner} />
      <p style={styles.loadingText}>Fetching places…</p>
    </div>
  );
}

// Delete confirmation modal
function Modal({ isOpen, onClose, onConfirm, placeName }) {
  if (!isOpen) return null;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>Remove Place?</h3>
        <p style={styles.modalText}>Remove <strong>{placeName}</strong> from your bucket list?</p>
        <div style={styles.modalActions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.confirmBtn} onClick={onConfirm}>Yes, Remove</button>
        </div>
      </div>
    </div>
  );
}

// Place card
function PlaceCard({ place, onSelect, onRemove, isSelected, showRemove }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}), ...(isSelected ? styles.cardSelected : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.cardImgWrap}>
        <img src={place.image} alt={place.title} style={styles.cardImg} />
        <div style={styles.cardOverlay} />
        {isSelected && <div style={styles.selectedBadge}>✓ In your list</div>}
      </div>
      <div style={styles.cardBody}>
        <p style={styles.cardCountry}>{place.country}</p>
        <h3 style={styles.cardTitle}>{place.title}</h3>
        <p style={styles.cardDesc}>{place.body.slice(0, 60)}…</p>
        <div style={styles.cardActions}>
          {!showRemove
            ? <button style={styles.addBtn} onClick={() => onSelect(place)}>+ Add to List</button>
            : <button style={styles.removeBtn} onClick={() => onRemove(place)}>✕ Remove</button>
          }
        </div>
      </div>
    </div>
  );
}

// Wishlist section
function WishlistSection({ places, onRemove }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>I'd like to visit …</h2>
      {places.length === 0 ? (
        <p style={styles.emptyMsg}>Select the places you would like to visit below.</p>
      ) : (
        <div style={styles.grid}>
          {places.map(p => (
            <PlaceCard key={p.id} place={p} onRemove={onRemove} isSelected showRemove />
          ))}
        </div>
      )}
    </section>
  );
}

// Available places section — fetches & transforms API data
function AvailablePlacesSection({ onSelect, wishlistIds }) {
  const transformPlaces = useCallback((posts) =>
    posts.slice(0, 10).map(p => ({
      id: p.id,
      title: p.title.slice(0, 28),
      body: p.body,
      image: PLACE_IMAGES[p.id] || PLACE_IMAGES[1],
      country: PLACE_COUNTRIES[p.id - 1] || "Unknown",
    })), []);

  const { data: places, isLoading, error, refetch } = useFetch(`${BASE_URL}/posts`, transformPlaces);

  return (
    <section style={styles.section}>
      <h2 style={{ ...styles.sectionTitle, color: "#4dd9e8" }}>Available Places</h2>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!isLoading && !error && places?.length === 0 && <p style={styles.emptyMsg}>No places available.</p>}
      {!isLoading && !error && places && (
        <div style={styles.grid}>
          {places.map(p => (
            <PlaceCard
              key={p.id} place={p} onSelect={onSelect}
              isSelected={wishlistIds.has(p.id)} showRemove={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Main app
export default function PlacePicker() {
  const [wishlist, setWishlist]   = useState([]);
  const [modalData, setModalData] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const showStatus = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  // Add place via POST with optimistic update
  const handleSelectPlace = useCallback(async (place) => {
    if (wishlist.find(p => p.id === place.id)) return;
    setWishlist(prev => [place, ...prev]);
    showStatus('✅ Added "' + place.title + '"');
    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: place.title, body: place.body, userId: 1 }),
      });
      if (!res.ok) throw new Error("POST failed: " + res.status);
    } catch (err) {
      setWishlist(prev => prev.filter(p => p.id !== place.id));
      showStatus("❌ Failed to save: " + err.message);
    }
  }, [wishlist]);

  // Remove place via DELETE with optimistic update
  const handleConfirmRemove = useCallback(async () => {
    const place = modalData?.place;
    if (!place) return;
    setModalData(null);
    setWishlist(prev => prev.filter(p => p.id !== place.id));
    showStatus('🗑️ Removed "' + place.title + '"');
    try {
      const res = await fetch(`${BASE_URL}/posts/${place.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("DELETE failed: " + res.status);
    } catch (err) {
      setWishlist(prev => [place, ...prev]);
      showStatus("❌ Remove failed: " + err.message);
    }
  }, [modalData]);

  const wishlistIds = new Set(wishlist.map(p => p.id));

  return (
    <div style={styles.app}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <span style={styles.logoEmoji}>🌍</span>
        </div>
        <h1 style={styles.appTitle}>PLACEPICKER</h1>
        <p style={styles.appSubtitle}>
          Create your personal collection of places you would like to visit or you have visited.
        </p>
      </header>

      {statusMsg && <div style={styles.toast}>{statusMsg}</div>}

      <div style={styles.mainLayout}>
        <main style={styles.main}>
          <WishlistSection places={wishlist} onRemove={(place) => setModalData({ place })} />
          <AvailablePlacesSection onSelect={handleSelectPlace} wishlistIds={wishlistIds} />
        </main>
      </div>

      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        onConfirm={handleConfirmRemove}
        placeName={modalData?.place?.title}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e1a; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;} }
        @keyframes toast { 0%{opacity:0;transform:translateY(-20px);} 10%,90%{opacity:1;transform:translateY(0);} 100%{opacity:0;transform:translateY(-20px);} }
      `}</style>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0e1a 0%, #0d1829 50%, #091218 100%)",
    fontFamily: "'Outfit', sans-serif",
    color: "#e0eaf5",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-20%", left: "-10%", width: 500, height: 500,
    background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)",
    borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
    animation: "blob 8s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed", bottom: "-15%", right: "-10%", width: 600, height: 600,
    background: "radial-gradient(circle, rgba(0,255,160,0.06) 0%, transparent 70%)",
    borderRadius: "40% 60% 70% 30%/40% 50% 60% 50%",
    animation: "blob 10s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0,
  },
  header: { textAlign: "center", paddingTop: 48, paddingBottom: 36, position: "relative", zIndex: 1 },
  logoWrap: {
    width: 72, height: 72, borderRadius: "50%",
    background: "linear-gradient(135deg, #00c8ff, #00ffa0)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px", boxShadow: "0 0 32px rgba(0,200,255,0.4)",
  },
  logoEmoji: { fontSize: 36 },
  appTitle: {
    fontFamily: "'Orbitron', monospace", fontSize: 42, fontWeight: 900, letterSpacing: "0.25em",
    background: "linear-gradient(90deg, #00c8ff, #00ffa0)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 12,
  },
  appSubtitle: { color: "#7a9bb5", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 },
  toast: {
    position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
    background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.4)",
    borderRadius: 8, padding: "10px 24px", fontSize: 14, color: "#a0dff0",
    backdropFilter: "blur(12px)", zIndex: 1000, animation: "toast 3s ease forwards", whiteSpace: "nowrap",
  },
  mainLayout: { padding: "0 24px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 },
  main: { flex: 1, display: "flex", flexDirection: "column", gap: 24 },
  section: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,200,255,0.15)",
    borderRadius: 16, padding: "28px 32px", backdropFilter: "blur(12px)",
  },
  sectionTitle: {
    fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 700,
    color: "#a0dff0", marginBottom: 20, letterSpacing: "0.1em",
  },
  emptyMsg: { color: "#4a6a80", fontSize: 14, textAlign: "center", padding: "12px 0" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 },
  card: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,200,255,0.12)",
    borderRadius: 12, overflow: "hidden", transition: "all 0.25s ease", cursor: "pointer",
  },
  cardHover: {
    border: "1px solid rgba(0,200,255,0.4)", transform: "translateY(-4px)",
    boxShadow: "0 12px 32px rgba(0,200,255,0.15)",
  },
  cardSelected: { border: "1px solid rgba(0,255,160,0.4)", background: "rgba(0,255,160,0.05)" },
  cardImgWrap: { position: "relative", height: 140 },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(10,14,26,0.7) 0%, transparent 60%)",
  },
  selectedBadge: {
    position: "absolute", top: 8, right: 8, background: "rgba(0,255,160,0.9)",
    color: "#001a0d", fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 8px",
  },
  cardBody: { padding: "14px 14px 16px" },
  cardCountry: { color: "#4dd9e8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 },
  cardTitle: { color: "#d0e8f5", fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 },
  cardDesc: { color: "#6a8a9f", fontSize: 12, lineHeight: 1.5, marginBottom: 12 },
  cardActions: { display: "flex", justifyContent: "flex-end" },
  addBtn: {
    background: "linear-gradient(135deg, #00c8ff22, #00c8ff44)", border: "1px solid rgba(0,200,255,0.5)",
    color: "#00c8ff", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s",
  },
  removeBtn: {
    background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.4)",
    color: "#ff8080", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s",
  },
  loadingWrap: { display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0", gap: 12 },
  spinner: {
    width: 36, height: 36, border: "3px solid rgba(0,200,255,0.15)",
    borderTopColor: "#00c8ff", borderRadius: "50%", animation: "spin 0.8s linear infinite",
  },
  loadingText: { color: "#4a6a80", fontSize: 13 },
  errorBox: {
    background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.25)",
    borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
  },
  errorIcon: { fontSize: 24 },
  errorText: { color: "#ff9090", fontSize: 14, flex: 1 },
  retryBtn: {
    background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.4)",
    color: "#ff8080", borderRadius: 6, padding: "6px 16px", fontSize: 13, cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
  },
  modalBox: {
    background: "#0d1829", border: "1px solid rgba(0,200,255,0.25)", borderRadius: 16,
    padding: "32px 36px", maxWidth: 400, width: "90%",
    boxShadow: "0 24px 80px rgba(0,0,0,0.6)", animation: "fadeIn 0.2s ease",
  },
  modalTitle: { fontFamily: "'Orbitron', monospace", color: "#a0dff0", fontSize: 18, marginBottom: 12 },
  modalText: { color: "#6a8a9f", fontSize: 14, lineHeight: 1.6, marginBottom: 24 },
  modalActions: { display: "flex", gap: 12, justifyContent: "flex-end" },
  cancelBtn: {
    background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
    color: "#6a8a9f", borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer",
  },
  confirmBtn: {
    background: "linear-gradient(135deg, #ff4040, #ff6060)", border: "none",
    color: "#fff", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
};