export default function Loading() {
  return (
    <article>
      <div className="container" style={{ marginTop: "100px", marginBottom: "50px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Image skeleton */}
          <div
            className="skeleton"
            style={{ width: "100%", height: "450px", borderRadius: "20px", marginBottom: "30px" }}
          />

          {/* Author + date skeleton */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
            <div className="skeleton" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            <div className="skeleton" style={{ width: "120px", height: "16px", borderRadius: "6px" }} />
            <div className="skeleton" style={{ width: "80px", height: "16px", borderRadius: "6px" }} />
          </div>

          {/* Title skeleton */}
          <div className="skeleton" style={{ width: "70%", height: "36px", borderRadius: "8px", marginBottom: "20px" }} />

          {/* Paragraphs skeleton */}
          {[100, 90, 95, 80, 85].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: `${w}%`, height: "18px", borderRadius: "6px", marginBottom: "14px" }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
