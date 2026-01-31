import { Link } from "react-router-dom";

const Layanan = () => {
  const suratKependudukan = [
    {
      no: 1,
      nama: "Surat Keterangan Domisili",
      deskripsi: "Surat keterangan domisili untuk keperluan administrasi",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 2,
      nama: "Surat Nikah",
      deskripsi: "Surat Nikah",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 3,
      nama: "Surat Pengantar Kartu Keluarga (KK)",
      deskripsi: "Surat pengantar untuk pembuatan atau perubahan KK",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 4,
      nama: "Surat Keterangan Pindah",
      deskripsi: "Surat keterangan untuk kepindahan domisili",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 5,
      nama: "Surat Akta Kelahiran",
      deskripsi: "Surat Akta Kelahiran",
      path: "/layanan/form",
      id_dokumen: "2",
    },
    {
      no: 6,
      nama: "Surat Kematian",
      deskripsi: "Surat Keterangan/Akta Kematian",
      path: "/layanan/form",
      id_dokumen: null,
    },
  ];

  const suratEkonomi = [
    {
      no: 1,
      nama: "Surat Keterangan Tidak Mampu (SKTM)",
      deskripsi: "SKTM untuk keperluan administrasi umum",
      path: "/layanan/form",
      id_dokumen: "1",
    },
    {
      no: 2,
      nama: "Surat Keterangan Usaha",
      deskripsi: "Surat keterangan untuk usaha mikro dan makro",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 3,
      nama: "Surat Keterangan Penghasilan",
      deskripsi: "Surat keterangan penghasilan untuk keperluan kredit",
      path: "/layanan/form",
      id_dokumen: null,
    },
  ];

  const suratSosial = [
    {
      no: 1,
      nama: "Surat Izin Keramaian",
      deskripsi: "Surat izin untuk acara keramaian atau hajatan",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 2,
      nama: "Surat Keterangan Janda/Duda",
      deskripsi: "Surat keterangan status cerai atau ditinggal mati",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 3,
      nama: "Surat Keterangan Ahli Waris",
      deskripsi: "Surat keterangan untuk keperluan ahli waris",
      path: "/layanan/form",
      id_dokumen: null,
    },
  ];

  const SectionTable = ({ title, items, iconColor }) => (
    <section className="mb-8">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-white" style={{ backgroundColor: "#2F4156" }}>
              <th className="px-3 py-2 text-left text-sm font-semibold w-12">No</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Nama Dokumen</th>
              <th className="px-3 py-2 text-left text-sm font-semibold w-28">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-3 py-2 text-sm text-gray-700">{item.no}</td>
                <td className="px-3 py-2">
                  <div className="flex items-start gap-2">
                    <div
                      className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${iconColor}`}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.nama}</p>
                      <p className="text-xs text-gray-500">{item.deskripsi}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <Link
                    to={item.path + (item.id_dokumen ? `?dokumen=${item.id_dokumen}` : "")}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                  >
                    Telusuri
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-24 pb-20 min-h-screen">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">
          Template Dokumen
        </h1>
        <p className="text-sm text-gray-600 mt-0.5">
          Unduh template surat yang anda butuhkan
        </p>
        <Link
          to="/layanan/status-dokumen"
          className="inline-block mt-6 text-white font-medium px-8 py-2 rounded-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: "#2F4156" }}
        >
          Cek Status
        </Link>
      </div>

      <SectionTable
        title="Surat Kependudukan"
        items={suratKependudukan}
        iconColor="bg-blue-500"
      />
      <SectionTable
        title="Surat Ekonomi & Pekerjaan"
        items={suratEkonomi}
        iconColor="bg-green-600"
      />
      <SectionTable
        title="Surat Sosial & Umum"
        items={suratSosial}
        iconColor="bg-orange-500"
      />
    </div>
  );
};

export default Layanan;
