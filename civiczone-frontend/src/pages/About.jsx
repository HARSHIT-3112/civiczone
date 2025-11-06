function About() {
  return (
    <div className="max-w-3xl mx-auto text-center mt-12 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">About CivicZone</h2>
      <p className="text-gray-700 leading-relaxed">
        CivicZone empowers citizens to take charge of their surroundings by
        reporting civic issues like potholes, garbage, and pollution. With just
        a photo and one click, our AI identifies the issue, locates it
        automatically, and generates a report for the authorities.
      </p>
      <p className="mt-4 text-gray-600">
        Built with ❤️ using React, FastAPI, and AI Vision.
      </p>
    </div>
  );
}

export default About;
