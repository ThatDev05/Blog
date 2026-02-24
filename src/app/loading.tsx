export default function Loading() {
  return (
    <article>
      {/* Hero skeleton */}
      <section className="section hero">
        <div className="container">
          <div className="skeleton" style={{ width: "60%", height: "48px", borderRadius: "8px", marginBottom: "16px" }} />
          <div className="skeleton" style={{ width: "40%", height: "48px", borderRadius: "8px" }} />
        </div>
      </section>

      {/* Featured posts skeleton */}
      <section className="section featured">
        <div className="container">
          <div className="skeleton" style={{ width: "220px", height: "20px", borderRadius: "6px", marginBottom: "24px" }} />
          <ul className="has-scrollbar" style={{ display: "flex", gap: "20px", listStyle: "none", padding: 0 }}>
            {[1, 2, 3].map((i) => (
              <li key={i} className="scrollbar-item">
                <div className="blog-card">
                  <div className="skeleton" style={{ width: "320px", height: "220px", borderRadius: "12px", marginBottom: "16px" }} />
                  <div className="skeleton" style={{ width: "80%", height: "18px", borderRadius: "6px", marginBottom: "10px" }} />
                  <div className="skeleton" style={{ width: "60%", height: "14px", borderRadius: "6px" }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent posts grid skeleton */}
      <section className="section recent" id="recent-posts">
        <div className="container">
          <div className="skeleton" style={{ width: "280px", height: "28px", borderRadius: "8px", marginBottom: "32px" }} />
          <ul className="grid-list" style={{ listStyle: "none", padding: 0 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i}>
                <div className="blog-card">
                  <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "12px", marginBottom: "14px" }} />
                  <div className="skeleton" style={{ width: "90%", height: "18px", borderRadius: "6px", marginBottom: "10px" }} />
                  <div className="skeleton" style={{ width: "70%", height: "14px", borderRadius: "6px" }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
