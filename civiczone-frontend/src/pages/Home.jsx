import ImageUploader from "../components/ImageUploader";

function Home() {
  return (
    <div className="pt-12 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-3">
        Report Issues, Build Better Cities 🌆
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Upload a photo of any civic issue — our AI will detect it and notify the
        authorities.
      </p>
      <ImageUploader />
    </div>
  );
}

export default Home;
