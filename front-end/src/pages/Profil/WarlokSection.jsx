const WarlokSection = () => {
  return (
    <section className="relative bg-[#2f465d] py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Judul */}
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Apa Kata Warlok ??</h2>
          <p className="mt-3 text-sm lg:text-base text-gray-200">
            Berikut adalah beberapa ulasan dari warga lokal tentang Desa
            Sidodadi Asri
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10 flex flex-col lg:flex-row gap-8 items-center">
          {/* Foto */}
          <div className="flex-shrink-0">
            <img
              src="/images/warlok.png"
              alt="Warga Desa"
              className="w-40 h-40 object-cover rounded-full border-4 border-[#2f465d]"
            />
          </div>

          {/* Konten */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-gray-800">SUTIYO & ISTRI</h3>

            <span className="inline-block mt-1 text-xs font-semibold text-white bg-[#2f465d] px-3 py-1 rounded-full">
              WARGA DESA SIDODADI ASRI
            </span>

            <p className="mt-5 text-gray-600 leading-relaxed text-sm lg:text-base">
              Desa Sidodadi Asri adalah desa yang nyaman untuk ditinggali karena
              warganya hidup rukun, ramah, dan terbiasa bermusyawarah dalam
              menyelesaikan berbagai permasalahan. Berdasarkan pengalaman saya
              bertahun-tahun tinggal di sini, suasana kekeluargaan masih sangat
              terasa dan menjadi kebanggaan bagi kami sebagai warga Desa
              Sidodadi Asri.
            </p>

            {/* Rating */}
            <div className="mt-4 flex justify-center lg:justify-start gap-1 text-yellow-400">
              ★ ★ ★ ★ ★
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarlokSection;
