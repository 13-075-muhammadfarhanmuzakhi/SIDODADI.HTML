import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_LIST = "http://127.0.0.1:8000/api/layanan";
const API_CEK_STATUS = "http://127.0.0.1:8000/api/layanan/cek-status";
const PER_PAGE = 10;

const statusConfig = {
  Diproses: { label: "Diproses", dot: "bg-yellow-500", pill: "bg-yellow-100", text: "text-yellow-800" },
  Ditolak: { label: "Ditolak", dot: "bg-red-500", pill: "bg-red-100", text: "text-red-800" },
  Disetujui: { label: "Disetujui", dot: "bg-green-500", pill: "bg-green-100", text: "text-green-800" },
  // Backward compat jika masih ada data lama
  "Dalam Proses": { label: "Diproses", dot: "bg-yellow-500", pill: "bg-yellow-100", text: "text-yellow-800" },
  Terkirim: { label: "Disetujui", dot: "bg-green-500", pill: "bg-green-100", text: "text-green-800" },
  Selesai: { label: "Disetujui", dot: "bg-green-500", pill: "bg-green-100", text: "text-green-800" },
};

const StatusDokumen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);

  const fetchStatus = async (query) => {
    setLoading(true);
    try {
      const trimmed = query && query.trim();
      // Selalu gunakan API_LIST untuk menampilkan semua data
      // Jika ada query, gunakan API_CEK_STATUS untuk filter
      const url = trimmed
        ? API_CEK_STATUS + "?q=" + encodeURIComponent(trimmed)
        : API_LIST;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await res.json();
      const list = Array.isArray(json) ? json : (json?.data && Array.isArray(json.data) ? json.data : []);
      setData(list);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load semua data saat pertama kali
    fetchStatus("");
  }, []);

  const onSearch = () => {
    setSearched(true);
    setPage(1);
    fetchStatus(search);
  };

  const formatPhone = (phone) => {
    if (!phone) return "-";
    let n = String(phone).replace(/\D/g, "");
    
    // Remove leading 62 if exists (country code)
    if (n.startsWith("62")) {
      n = n.substring(2);
    }
    // Remove leading 0 if exists
    if (n.startsWith("0")) {
      n = n.substring(1);
    }
    
    // Need at least 6 digits (3 first + 3 last)
    if (n.length < 6) return "+62 " + n;
    
    // Get first 3 and last 3 digits
    const first3 = n.substring(0, 3);
    const last3 = n.substring(n.length - 3);
    const middleLength = n.length - 6;
    const masked = "*".repeat(middleLength);
    
    return `+62 ${first3} ${masked} ${last3}`;
  };

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const getStatusDisplay = (status) => {
    return statusConfig[status] || { label: status || "-", dot: "bg-gray-400", pill: "bg-gray-100", text: "text-gray-800" };
  };

  const filtered = data;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pt-24 pb-20 min-h-screen bg-white">
      <div className="mb-4">
        <Link to="/layanan" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
          ← Kembali ke Template Dokumen
        </Link>
      </div>

      {/* Header - dark blue */}
      <div className="rounded-t-xl px-6 py-4" style={{ backgroundColor: "#2F4156" }}>
        <h1 className="text-xl font-bold text-white">
          Data Pengajuan Layanan Desa
        </h1>
      </div>

      {/* White card - table + search */}
      <div className="bg-white rounded-b-xl shadow-lg border border-t-0 border-gray-200 overflow-hidden">
        {/* Search - top right */}
        <div className="p-4 flex justify-end items-center gap-2 border-b border-gray-100">
          <div className="relative w-full max-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2F4156]/30 focus:border-[#2F4156]"
            />
          </div>
          <button
            type="button"
            onClick={onSearch}
            className="text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#2F4156" }}
          >
            Cari
          </button>
          <button
            type="button"
            onClick={() => fetchStatus(search)}
            disabled={loading}
            className="text-gray-600 border border-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title="Segarkan data (lihat perubahan status terbaru)"
          >
            Segarkan
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-amber-100">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Nama</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Nomor Telepon</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Tanggal Pengajuan</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-500 text-sm">
                    Memuat data...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-500 text-sm">
                    Tidak ada data pengajuan.
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const s = getStatusDisplay(row.status);
                  return (
                    <tr key={row.id_layanan} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm text-gray-900">{row.masyarakat?.nama_lengkap || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{formatPhone(row.masyarakat?.no_telepon)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{formatDate(row.tgl_pengajuan)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${s.pill} ${s.text}`}>
                          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - like in image */}
        <div className="px-4 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            Menampilkan {currentPage} dari Total {totalPages} Halaman
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`min-w-[2rem] py-1.5 px-2 text-sm font-medium rounded-md ${
                  currentPage === p
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDokumen;
