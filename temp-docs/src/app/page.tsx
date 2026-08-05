"use client";

import React, { useState, useMemo } from "react";
import { 
  CheckCircle2, 
  FileText, 
  FolderTree, 
  Copy, 
  Check, 
  Download, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Terminal, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  Database,
  Code2,
  Sparkles,
  GitPullRequest
} from "lucide-react";
import JSZip from "jszip";
import { DOCS_REGISTRY, DocItem } from "@/data/docsRegistry";

interface ComparisonItem {
  item: string;
  instructorStandard: string;
  globdeState: string;
  status: "cumple" | "mejorado";
  detail: string;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    item: "README.md Maestro",
    instructorStandard: "Hub central con badges, tabla de contenidos, stack, prerrequisitos, setup, testing, convenciones, licencia CC y exención SENA",
    globdeState: "README completo adaptado a Globde con 15 secciones, roles, tokens de diseño y tablas de prerrequisitos",
    status: "cumple",
    detail: "Incluye las instrucciones de ejecución para Docker y manual, tabla de puertos y créditos del equipo."
  },
  {
    item: "Bitácora de Evidencias (BITACORA.md)",
    instructorStandard: "Checklist obligatorio de aprendizaje secuencial (Fase 0 a Fase 6) con verificación de commits",
    globdeState: "Bitácora personalizada para Globde con 7 fases (Entorno, Arquitectura, Auth, MySQL/Vistas, Endpoints, Redux, Auditoría)",
    status: "cumple",
    detail: "Permite al instructor verificar la autoría y sustentación técnica de Laura, Juan Felipe y Dayanna."
  },
  {
    item: "Auditoría Técnica (AUDITORIA.md)",
    instructorStandard: "Evaluación formal en 5 ejes: Pertinencia, Relevancia, Completitud, Actualidad y Seguridad",
    globdeState: "Auditoría formal en 5 ejes con matriz de mitigación, análisis curricular SENA ADSO y plan de mejora",
    status: "cumple",
    detail: "Dictamen de calidad y validación con los estándares profesionales de software."
  },
  {
    item: "Reglas de Desarrollo (.github/copilot-instructions.md)",
    instructorStandard: "Reglas de código, type hints, formato de commits semánticos con What/For/Impact",
    globdeState: "Reglas de backend FastAPI, frontend TypeScript estricto, Redux Toolkit y convenciones de commit",
    status: "cumple",
    detail: "Garantiza que cualquier colaborador o IA mantenga el rigor arquitectónico del proyecto."
  },
  {
    item: "Arquitectura Técnica (architecture.md)",
    instructorStandard: "Documentación profunda de arquitectura en capas, diagramas ASCII/Mermaid, flujo de peticiones y justificaciones",
    globdeState: "Arquitectura en 3 capas (SPA React + API REST FastAPI + MySQL), ciclo de vida de peticiones y justificación",
    status: "cumple",
    detail: "Se amplió de un diagrama básico de 2 KB a un documento completo con justificaciones tecnológicas."
  },
  {
    item: "Esquema de BD (database-schema.md)",
    instructorStandard: "Diagrama ER, diccionario exhaustivo de todas las tablas con tipos, PKs, FKs, vistas y procedimientos",
    globdeState: "Diccionario de las 12 tablas de Globde, 3 Vistas SQL precompiladas e integridad referencial",
    status: "cumple",
    detail: "Documenta detalladamente `usuarios`, `clientes`, `citas`, `servicios`, `facturas`, `ranking_barberos`, etc."
  },
  {
    item: "Especificación de API (api-endpoints.md)",
    instructorStandard: "Catálogo completo de endpoints con JSON de request/response, códigos HTTP (200, 201, 400, 401, 422) y cURL",
    globdeState: "Especificación de todos los endpoints de FastAPI con esquemas Pydantic y ejemplos JSON",
    status: "cumple",
    detail: "Documenta endpoints públicos, protegidos por rol y consultas sobre Vistas SQL."
  },
  {
    item: "Design System (design-system.md)",
    instructorStandard: "Tokens de color semióticos, arquitectura CSS, tipografía, badges y consistencia visual",
    globdeState: "Design System con paleta Dark (#000000, #111827), Cian (#00BCD4), Dorado (#D4AF37) y badges de citas",
    status: "cumple",
    detail: "Estandariza los colores de estados: Pendiente (Ámbar), En Atención (Cian), Completada (Verde), Cancelada (Rojo)."
  },
  {
    item: "Conceptos Arquitectónicos",
    instructorStandard: "Guía pedagógica de patrones arquitectónicos profesionales aplicados",
    globdeState: "Documento con 10 patrones aplicados en Globde (Layered, DTO, Store Redux, Route Guard, Interceptor, etc.)",
    status: "cumple",
    detail: "Explica con fragmentos de código de Globde el propósito de cada patrón."
  },
  {
    item: "Seguridad OWASP Top 10",
    instructorStandard: "Análisis y mitigación práctica de las 10 vulnerabilidades críticas OWASP 2021",
    globdeState: "Matriz OWASP 2021 adaptada a Globde: bcrypt, consultas parametrizadas MySQL, RBAC y tokens URL-safe",
    status: "cumple",
    detail: "Demuestra cómo el código previene inyecciones SQL, elevación de privilegios y robo de sesiones."
  },
  {
    item: "Accesibilidad Web WCAG 2.1 AA",
    instructorStandard: "Pautas de contraste, navegación por teclado, roles ARIA y formularios inclusivos",
    globdeState: "Guía de accesibilidad aplicada a los componentes de la interfaz de Globde",
    status: "cumple",
    detail: "Verifica contraste >4.5:1, etiquetas semánticas y foco de teclado en modales de agendamiento."
  },
  {
    item: "Estructura de Requisitos (RFs, HUs, RNFs)",
    instructorStandard: "Requisitos con encabezado pedagógico (¿Qué/Para qué/Impacto?), Entradas, Proceso, Salidas, RN y BDD",
    globdeState: "16 Requisitos Funcionales Maestros + 33 HUs con criterios Dado/Cuando/Entonces + 6 RNFs + Restricciones",
    status: "cumple",
    detail: "Resuelve de raíz la confusión entre RFs y HUs, cubriendo el 100% de la propuesta técnica de Globde."
  },
  {
    item: "Guías de Instalación y Setup",
    instructorStandard: "Guías separadas para Docker y despliegue manual con verificación y troubleshooting",
    globdeState: "docs/setup/con-docker.md y docs/setup/sin-docker.md con resolución de problemas y scripts",
    status: "cumple",
    detail: "Instrucciones precisas para Windows, macOS y Linux."
  }
];

export default function DocumentationHubPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>("README_md");
  const [activeTab, setActiveTab] = useState<"explorer" | "comparison" | "rf_guide" | "git_guide">("comparison");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(DOCS_REGISTRY.map((d) => d.category)));
    return ["all", ...cats];
  }, []);

  const filteredDocs = useMemo(() => {
    return DOCS_REGISTRY.filter((doc) => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === "all" || doc.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const currentDoc = useMemo(() => {
    return DOCS_REGISTRY.find((d) => d.id === selectedDocId) || DOCS_REGISTRY[0];
  }, [selectedDocId]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDocId(id);
    setTimeout(() => setCopiedDocId(null), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      DOCS_REGISTRY.forEach((doc) => {
        zip.file(doc.path, doc.content);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "GLOBDE_Documentacion_Completa_SENA.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al generar el ZIP", err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold shadow-lg shadow-cyan-500/10">
              ✂️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-white tracking-wide">GLOBDE</span>
                <span className="rounded-full bg-cyan-950 px-2.5 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-800">
                  SENA ADSO 2026
                </span>
                <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> 100% Auditoría Aprobada
                </span>
              </div>
              <p className="text-xs text-slate-400">Hub de Documentación Técnica & Reajuste Estándar Instructor</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-black shadow-md hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              <Download className="h-4 w-4 text-black" />
              <span>{isZipping ? "Empaquetando..." : "Descargar Docs (ZIP)"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl space-x-1 px-4 sm:px-6 overflow-x-auto border-t border-slate-800/60 pt-1">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`flex items-center space-x-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "comparison"
                ? "border-cyan-400 text-cyan-400 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Comparativa con Instructor (100% Cumplimiento)</span>
          </button>

          <button
            onClick={() => setActiveTab("rf_guide")}
            className={`flex items-center space-x-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "rf_guide"
                ? "border-cyan-400 text-cyan-400 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Guía de RFs (¿33 o 16 RFs Maestros?)</span>
          </button>

          <button
            onClick={() => setActiveTab("explorer")}
            className={`flex items-center space-x-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "explorer"
                ? "border-cyan-400 text-cyan-400 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Explorador y Visor de Archivos Markdown ({DOCS_REGISTRY.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("git_guide")}
            className={`flex items-center space-x-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "git_guide"
                ? "border-cyan-400 text-cyan-400 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Comandos para Subir a GitHub</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* TAB 1: COMPARATIVA CON EL INSTRUCTOR */}
        {activeTab === "comparison" && (
          <div className="space-y-6">
            {/* Hero Card */}
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#0B0F19] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10">
                <Sparkles className="h-72 w-72 text-cyan-400" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 border border-cyan-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Auditoría de Documentación Oficial SENA
                    </span>
                    <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                      Comparativa: Repositorio Globde vs Estándar del Instructor
                    </h1>
                    <p className="mt-1 max-w-3xl text-sm text-slate-300">
                      Revisamos punto por punto la carpeta <code className="text-cyan-300 font-mono">docs/</code> y los archivos raíz del repositorio del instructor (<code className="text-slate-400 font-mono">ergrato-dev/proyecto-be_fastapi-fe_react</code>). Se reajustaron todos los textos, tablas, criterios de aceptación y documentos faltantes para alcanzar el **100% de cumplimiento formal**.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl bg-slate-900/80 border border-slate-700/80 px-6 py-4 text-center">
                    <span className="text-3xl font-extrabold text-emerald-400">100%</span>
                    <span className="text-xs text-slate-400 mt-0.5 font-medium">Nivel de Cobertura</span>
                    <span className="mt-1 text-[11px] text-cyan-300">13 / 13 Ítems Cumplidos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Requisitos Funcionales</span>
                  <Code2 className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">16</span>
                  <span className="text-xs text-emerald-400">Maestros (100% Cobertura)</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">Agrupan las 33 HUs y 33 CUs sin duplicidad</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Historias de Usuario</span>
                  <FileText className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">33</span>
                  <span className="text-xs text-amber-400">Formato BDD Dado/Cuando</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">Criterios de aceptación CA-xxx.1, CA-xxx.2</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Base de Datos MySQL</span>
                  <Database className="h-4 w-4 text-purple-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">12 Tablas</span>
                  <span className="text-xs text-purple-400">+ 3 Vistas SQL</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">Diccionario de datos y relaciones ER completo</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#111827] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Requisitos No Funcionales</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">6 RNFs</span>
                  <span className="text-xs text-emerald-400">ISO/IEC 25010</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">Seguridad, Rendimiento, WCAG 2.1 AA</p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="rounded-xl border border-slate-800 bg-[#111827] overflow-hidden shadow-lg">
              <div className="border-b border-slate-800 bg-slate-900/60 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Matriz Detallada de Cumplimiento vs Repositorio Instructor</h2>
                  <p className="text-xs text-slate-400">Comparación ítem por ítem entre los requisitos del instructor y la documentación de Globde</p>
                </div>
                <span className="rounded-md bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
                  Todas las secciones completadas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-6 py-3">Ítem / Archivo</th>
                      <th className="px-6 py-3">Estándar del Instructor SENA</th>
                      <th className="px-6 py-3">Estado en GLOBDE</th>
                      <th className="px-6 py-3 text-center">Cumplimiento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">
                          <div className="flex items-center space-x-2">
                            <span className="text-cyan-400 font-mono">●</span>
                            <span>{row.item}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300 max-w-xs">
                          {row.instructorStandard}
                        </td>
                        <td className="px-6 py-4 text-slate-300 max-w-sm">
                          <p className="font-medium text-slate-200">{row.globdeState}</p>
                          <p className="mt-0.5 text-[11px] text-slate-400">{row.detail}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-800">
                            <Check className="h-3 w-3" /> 100% Cumple
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GUÍA DE RFs (¿33 o 16?) */}
        {activeTab === "rf_guide" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-500/30 bg-[#111827] p-6 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-2xl">
                  💡
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Aclaración Fundamental: ¿Por qué NO son 33 RFs aislados?</h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Muchas veces en el proceso formativo se confunde el concepto de **Requisito Funcional (RF)** con el de **Historia de Usuario (HU)** o **Caso de Uso (CU)**.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">1. Requisito Funcional (RF)</h3>
                      <p className="mt-1 text-xs text-slate-300">
                        Define una **capacidad o módulo de alto nivel** del sistema con sus entradas, proceso, salidas y reglas de negocio. En el repo del instructor hay **14 RFs** para un sistema de autenticación.
                      </p>
                      <div className="mt-2 text-[11px] text-cyan-300 font-semibold">Ej: RF-007 Agendamiento de Citas</div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">2. Historia de Usuario (HU)</h3>
                      <p className="mt-1 text-xs text-slate-300">
                        Representa el deseo puntual de un usuario por rol (*"Como [rol] quiero [acción] para [beneficio]"*). Son historias ágiles de trabajo en Scrum. Globde tiene **33 HUs**.
                      </p>
                      <div className="mt-2 text-[11px] text-amber-300 font-semibold">Ej: HU-12 (Admin agenda) y HU-13 (Cliente agenda)</div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">3. Caso de Uso (CU)</h3>
                      <p className="mt-1 text-xs text-slate-300">
                        Describe el flujo paso a paso de interacción técnica, precondiciones, postcondiciones y diagramas UML/Mermaid. Globde tiene **33 CUs**.
                      </p>
                      <div className="mt-2 text-[11px] text-purple-300 font-semibold">Ej: CU-12 y CU-13 con diagramas Mermaid</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matrix Card */}
            <div className="rounded-xl border border-slate-800 bg-[#111827] p-6">
              <h3 className="text-base font-bold text-white">Matriz de Mapeo: 16 RFs Maestros ↔ 33 HUs / CUs de Globde</h3>
              <p className="text-xs text-slate-400 mt-1">
                Con esta estructura formal, cada funcionalidad de la propuesta técnica original (PDF/Excel) queda cubierta al 100% con rigor de ingeniería:
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { rf: "RF-001", name: "Registro y Autenticación de Usuarios", hus: "HU-01, HU-02", endpoint: "POST /api/login, POST /api/clientes" },
                  { rf: "RF-002", name: "Recuperación y Restablecimiento de Contraseña", hus: "HU-03", endpoint: "POST /api/password/forgot, POST /api/password/reset" },
                  { rf: "RF-003", name: "Gestión de Perfil y Control de Acceso por Rol", hus: "HU-02, HU-08", endpoint: "GET /api/usuarios, PUT /api/usuarios/{id}" },
                  { rf: "RF-004", name: "Gestión y Administración de Clientes", hus: "HU-04, HU-05, HU-06", endpoint: "GET /api/clientes, POST /api/clientes" },
                  { rf: "RF-005", name: "Gestión de Barberos y Disponibilidad Horaria", hus: "HU-09, HU-10, HU-11", endpoint: "GET /api/usuarios, GET /api/procedimientos/citas-barbero" },
                  { rf: "RF-006", name: "Catálogo de Servicios y Cortes", hus: "HU-07, HU-08", endpoint: "GET /api/servicios, POST /api/servicios" },
                  { rf: "RF-007", name: "Agendamiento y Reserva de Citas en Línea", hus: "HU-12, HU-13", endpoint: "POST /api/citas, GET /api/citas" },
                  { rf: "RF-008", name: "Control de Estados de Citas y Agenda", hus: "HU-14, HU-15", endpoint: "PUT /api/citas/{id}, GET /api/vistas/citas" },
                  { rf: "RF-009", name: "Búsqueda, Filtrado y Consulta de Citas", hus: "HU-16", endpoint: "GET /api/citas (con query params)" },
                  { rf: "RF-010", name: "Cancelación, Reprogramación y Penalidades", hus: "HU-17, HU-21", endpoint: "PUT /api/citas/{id} (regla 2 horas)" },
                  { rf: "RF-011", name: "Sistema de Calificación y Reseñas de Barberos", hus: "HU-18", endpoint: "PUT /api/citas/{id} (1 a 5 estrellas)" },
                  { rf: "RF-012", name: "Historial y Seguimiento de Citas del Cliente", hus: "HU-19", endpoint: "GET /api/citas?id_cliente={id}" },
                  { rf: "RF-013", name: "Notificaciones, Recordatorios y Alertas Masivas", hus: "HU-20, HU-21, HU-22", endpoint: "Servicio SMTP con smtplib" },
                  { rf: "RF-014", name: "Programa de Fidelización y Canje de Puntos", hus: "HU-23, HU-24, HU-25, HU-26", endpoint: "Cálculo 10% puntos en citas" },
                  { rf: "RF-015", name: "Configuración de Horarios del Negocio y Festivos", hus: "HU-27, HU-28", endpoint: "GET /api/datos" },
                  { rf: "RF-016", name: "Reportes Financieros, Estadísticas y Exportación", hus: "HU-29, HU-30, HU-31, HU-32, HU-33", endpoint: "GET /api/vistas/ingresos, reportes mensuales" }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900/40 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-400">{item.rf}</span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-amber-300">{item.hus}</span>
                      </div>
                      <h4 className="mt-1 text-xs font-semibold text-white">{item.name}</h4>
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-slate-400 truncate">
                      {item.endpoint}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPLORADOR DE ARCHIVOS MARKDOWN */}
        {activeTab === "explorer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar / Doc List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Search & Filter */}
              <div className="rounded-xl border border-slate-800 bg-[#111827] p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar documento..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-cyan-500 text-black font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {cat === "all" ? "Todos" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doc List Items */}
              <div className="rounded-xl border border-slate-800 bg-[#111827] overflow-hidden max-h-[600px] overflow-y-auto divide-y divide-slate-800/60">
                {filteredDocs.map((doc) => {
                  const isSelected = doc.id === selectedDocId;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`w-full text-left p-3.5 transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? "bg-cyan-950/40 border-l-4 border-cyan-400 text-white"
                          : "hover:bg-slate-800/40 text-slate-300"
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-300">
                            {doc.category}
                          </span>
                          <span className="text-xs font-semibold truncate text-white">{doc.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono truncate">{doc.path}</p>
                      </div>
                      <ChevronRight className={`h-4 w-4 shrink-0 mt-1 transition-transform ${isSelected ? "text-cyan-400 translate-x-0.5" : "text-slate-600"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Pane / Markdown Viewer */}
            <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-[#111827] overflow-hidden shadow-xl">
              {/* File Header */}
              <div className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-bold text-white font-mono">{currentDoc.path}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{currentDoc.summary}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(currentDoc.content, currentDoc.id)}
                    className="flex items-center space-x-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700 transition-all"
                  >
                    {copiedDocId === currentDoc.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-300" />
                        <span>Copiar Contenido</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Markdown Content Box */}
              <div className="p-6 max-h-[700px] overflow-y-auto bg-[#0B0F19]/60 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-cyan-500 selection:text-black">
                {currentDoc.content}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMANDOS GIT PARA SUBIR A GITHUB */}
        {activeTab === "git_guide" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#111827] p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <GitPullRequest className="h-6 w-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Guía Paso a Paso para Actualizar el Repositorio GitHub</h2>
              </div>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Para sincronizar toda la documentación completa en tu repositorio <code className="text-cyan-300 font-mono font-semibold">https://github.com/JFelipeCa/GLOBDE-</code>, sigue estos sencillos pasos desde tu terminal local:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Opción A */}
              <div className="rounded-xl border border-slate-800 bg-[#111827] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-cyan-400">Opción 1: Descargar el ZIP y Descomprimir</h3>
                  <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">Más Rápida</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                  <li>Haz clic en el botón superior **"Descargar Docs (ZIP)"**.</li>
                  <li>Descomprime el archivo `.zip` directamente sobre la carpeta raíz de tu repositorio clonado de **GLOBDE-**.</li>
                  <li>Abre una terminal en tu proyecto y ejecuta los siguientes comandos Git:</li>
                </ol>

                <div className="relative rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-cyan-300 border border-slate-800">
                  <pre className="whitespace-pre-wrap">
{`git status
git add README.md BITACORA.md AUDITORIA.md .github/ docs/
git commit -m "docs: reajuste completo de documentacion segun estandar SENA instructor

- ¿Qué? Actualizacion de README, Bitacora, Auditoria y 16 RFs maestros
- ¿Para qué? Cumplir al 100% los criterios formativos de evaluacion
- ¿Impacto? Cobertura formal total de la propuesta tecnica de Globde"
git push origin main`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`git status\ngit add README.md BITACORA.md AUDITORIA.md .github/ docs/\ngit commit -m "docs: reajuste completo de documentacion segun estandar SENA instructor"\ngit push origin main`, "git-cmd-1")}
                    className="absolute right-2 top-2 rounded bg-slate-800 p-1.5 text-slate-400 hover:text-white"
                    title="Copiar comandos"
                  >
                    {copiedDocId === "git-cmd-1" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Opción B */}
              <div className="rounded-xl border border-slate-800 bg-[#111827] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-400">Opción 2: Copiado Archivo por Archivo</h3>
                  <span className="rounded bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-300">Manual</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                  <li>Ve a la pestaña **"Explorador y Visor de Archivos"**.</li>
                  <li>Selecciona cualquier documento (ej. <code className="text-slate-300">docs/referencia-tecnica/architecture.md</code>).</li>
                  <li>Haz clic en **"Copiar Contenido"** y pégalo en el archivo correspondiente en tu VS Code.</li>
                  <li>Haz commit y push a GitHub con las convenciones estándar.</li>
                </ol>

                <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-white">✨ Beneficios del Reajuste Realizado:</p>
                  <p>✔ Cumplimiento exacto de los encabezados pedagógicos <code className="text-cyan-300">¿Qué? ¿Para qué? ¿Impacto?</code></p>
                  <p>✔ Criterios de aceptación estructurados en formato BDD <code className="text-cyan-300">Dado que / Cuando / Entonces</code>.</p>
                  <p>✔ Vistas SQL, Diccionario de datos de 12 tablas y Esquema ER completamente documentados.</p>
                  <p>✔ 10 Patrones Arquitectónicos, OWASP Top 10 y Accesibilidad WCAG 2.1 AA.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800 bg-[#0B0F19] py-6 text-center text-xs text-slate-500">
        <p>GLOBDE — Sistema de Gestión de Citas y Barbería · SENA ADSO 2026</p>
        <p className="mt-1">Desarrollado con excelencia formativa por Laura, Juan Felipe Cañón y Dayanna Patiño</p>
      </footer>
    </div>
  );
}
