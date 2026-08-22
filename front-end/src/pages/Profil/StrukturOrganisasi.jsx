import React, { useEffect, useState } from "react";
import axios from "axios";

const StrukturOrganisasi = () => {
  const [perangkat, setPerangkat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data jika backend belum terhubung/data masih kosong
  const defaultData = [
    { id: 1, nama: "H. Mulyadi", jabatan: "Kepala Desa", foto: null },
    { id: 2, nama: "Legina, S.IP", jabatan: "Sekretaris Desa", foto: null },
    { id: 3, nama: "Sumarman", jabatan: "Kaur Keuangan", foto: null },
    { id: 4, nama: "Rukiyah", jabatan: "Kaur Perencanaan", foto: null },
  ];

  useEffect(() => {
    const fetchPerangkat = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/perangkat-desa",
        );
        if (response.data && response.data.length > 0) {
          setPerangkat(response.data);
        } else {
          setPerangkat(defaultData);
        }
      } catch (error) {
        console.warn("Koneksi backend gagal, menggunakan data default.", error);
        setPerangkat(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchPerangkat();
  }, []);

  return (
    <section className="py-14 px-4 bg-[#0A261D] text-white relative border-t border-[#B8860B]/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
            Struktur Perangkat Desa
          </h2>
          <p className="text-amber-400 text-xs md:text-sm mt-1">
            Pemerintah Desa Sidodadi Asri
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0A261D] via-[#B8860B] to-[#0A261D] mx-auto mt-2 rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center text-amber-400 py-8 text-sm">
            Memuat Data Perangkat Desa...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {perangkat.map((item) => (
              <div
                key={item.id}
                className="p-[1px] rounded-2xl bg-gradient-to-b from-[#B8860B] via-[#0A261D] to-[#B8860B]/40 shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-[#02140D] p-4 md:p-5 rounded-[15px] h-full flex flex-col items-center text-center border border-[#B8860B]/20">
                  {/* Foto Perangkat dari Admin / Storage Backend */}
                  <div className="w-24 h-24 md:w-28 md:h-28 mb-3 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-[#B8860B] to-emerald-400 shadow-md">
                    <img
                      src={
                        item.foto
                          ? item.foto.startsWith("http")
                            ? item.foto
                            : `http://localhost:8000/storage/${item.foto}`
                          : "https://via.placeholder.com/150/0A261D/FFFFFF?text=Perangkat"
                      }
                      alt={item.nama}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-amber-400 line-clamp-1">
                    {item.nama}
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">
                    {item.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
    