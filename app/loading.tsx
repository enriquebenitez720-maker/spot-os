// Esqueleto que se ve al instante mientras el servidor arma la pantalla
// siguiente. El sidebar y el breadcrumb viven en el layout, así que siguen
// visibles e interactivos mientras tanto.
export default function SpotLoading() {
  return (
    <div className="spot-page" aria-busy="true" aria-label="Cargando">
      <div className="spot-page-head">
        <div className="spot-skeleton" style={{ width: 88, height: 12 }} />
        <div className="spot-skeleton" style={{ width: "34%", height: 30, marginTop: 6 }} />
        <div className="spot-skeleton" style={{ width: "48%", height: 14, marginTop: 6 }} />
      </div>
      <div className="spot-grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="spot-skeleton" style={{ height: 68 }} />
        ))}
      </div>
    </div>
  );
}
