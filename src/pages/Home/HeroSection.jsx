export default function HeroSection() {
  return (
    <section
      className="h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-hero.jpg')" }}
    >
      <div className="text-center text-white bg-black/40 p-8 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold">
          Selamat Datang di Desa Sidodadi Asri
        </h1>
        <p className="mt-4 text-lg">
          Kec. Jati Agung, Lampung Selatan
        </p>
      </div>
    </section>
  );
}
