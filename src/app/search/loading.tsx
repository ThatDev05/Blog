export default function Loading() {
  return (
    <article>
      <section className="section hero">
        <div className="container">
          <div className="skeleton" style={{ width: "300px", height: "34px", borderRadius: "8px", marginBottom: "14px" }} />
          <div className="skeleton" style={{ width: "120px", height: "16px", borderRadius: "6px" }} />
        </div>
      </section>

      <section className="section recent">
        <div className="container">
          <ul className="grid-list" style={{ listStyle: "none", padding: 0 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i}>
                <div className="blog-card">
                  <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "12px", marginBottom: "14px" }} />
                  <div className="skeleton" style={{ width: "90%", height: "18px", borderRadius: "6px", marginBottom: "10px" }} />
                  <div className="skeleton" style={{ width: "65%", height: "14px", borderRadius: "6px" }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
