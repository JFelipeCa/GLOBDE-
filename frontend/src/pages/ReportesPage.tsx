import { useEffect, useState } from "react";

export function ReportesPage() {
  const [datosVista, setDatosVista] = useState<any[]>([]);
  const [datosProcedimiento, setDatosProcedimiento] = useState<any[]>([]);
  const [errorVista, setErrorVista] = useState("");
  const [errorProc, setErrorProc] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vistas/citas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar la vista SQL");
        return res.json();
      })
      .then((data) => setDatosVista(data))
      .catch((err) => setErrorVista(err.message));

    fetch("http://127.0.0.1:8000/api/procedimientos/servicios")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el procedimiento");
        return res.json();
      })
      .then((data) => setDatosProcedimiento(data))
      .catch((err) => setErrorProc(err.message));
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "Segoe UI, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "26px", color: "#111111", fontWeight: "bold", marginBottom: "30px", letterSpacing: "0.5px" }}>
          Módulo de Reportes Especializados
        </h2>

        <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #e9ecef", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#212529", fontWeight: "600" }}>
              Listado de Citas Agendadas
            </h3>
            <span style={{ fontSize: "11px", backgroundColor: "#e3faf7", color: "#00a896", padding: "4px 10px", borderRadius: "20px", fontWeight: "bold", textTransform: "uppercase" }}>
              Origen: Vista SQL
            </span>
          </div>
          <p style={{ color: "#6c757d", fontSize: "14px", margin: "0 0 20px 0" }}>
            Información integrada en tiempo real mapeada directamente desde una vista relacional en la base de datos.
          </p>

          {errorVista ? (
            <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "12px", borderRadius: "6px", fontSize: "14px" }}>{errorVista}</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #e9ecef" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>Cliente</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>Barbero</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>Fecha y Hora</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datosVista.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
                      <td style={{ padding: "12px", color: "#212529" }}>{item.cliente_nombre || item.cliente}</td>
                      <td style={{ padding: "12px", color: "#212529" }}>{item.barbero_nombre || item.barbero}</td>
                      <td style={{ padding: "12px", color: "#212529" }}>{item.fecha}</td>
                      <td style={{ padding: "12px", color: "#212529" }}>{item.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #e9ecef" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#212529", fontWeight: "600" }}>
              Catálogo de Servicios Disponibles
            </h3>
            <span style={{ fontSize: "11px", backgroundColor: "#f8f9fa", color: "#212529", padding: "4px 10px", borderRadius: "20px", fontWeight: "bold", textTransform: "uppercase", border: "1px solid #ced4da" }}>
              Origen: Procedimiento Almacenado
            </span>
          </div>
          <p style={{ color: "#6c757d", fontSize: "14px", margin: "0 0 20px 0" }}>
            Datos estructurados obtenidos mediante la ejecución directa de rutinas compiladas en el servidor MySQL.
          </p>

          {errorProc ? (
            <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "12px", borderRadius: "6px", fontSize: "14px" }}>{errorProc}</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #e9ecef" }}>
                    {datosProcedimiento.length > 0 &&
                      Object.keys(datosProcedimiento[0])
                        .filter((key) => !key.toLowerCase().includes("id"))
                        .map((cabecera) => (
                          <th key={cabecera} style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600", textTransform: "capitalize" }}>
                            {cabecera.replace("_", " ")}
                          </th>
                        ))}
                  </tr>
                </thead>
                <tbody>
                  {datosProcedimiento.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
                      {Object.keys(item)
                        .filter((key) => !key.toLowerCase().includes("id"))
                        .map((key) => (
                          <td key={key} style={{ padding: "12px", color: "#212529" }}>
                            {key.toLowerCase().includes("precio") || key.toLowerCase().includes("valor") ? `$${item[key]}` : item[key]}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}