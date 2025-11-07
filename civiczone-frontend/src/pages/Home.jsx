import ImageUploader from "../components/ImageUploader";
export default function Home({token}) {
  return (
    <div className="main-content">
      <div className="intro">
        <h1>CivicZone</h1>
        <p>Report civic issues — upload a photo and we'll notify the authorities.</p>
      </div>
      <ImageUploader token={token}/>
    </div>
  );
}
