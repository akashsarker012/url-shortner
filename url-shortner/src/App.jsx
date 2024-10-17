import { useState } from "react";
import "./App.css";
import UrlList from "./components/url-list";


function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShort = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      setShortenedUrl(data.shortenedUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-900 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100">
            Paste the URL to be shortened
          </h1>
          <p className="max-w-xl mx-auto mt-5 text-gray-500 dark:text-gray-400">
            ShortURL is a free tool to shorten URLs and generate short links. URL shortener allows creating a shortened link, making it easy to share.
          </p>
          <div className="flex justify-center max-w-4xl mx-auto py-6">
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="px-4 py-2 md:w-2/5 text-gray-700 bg-white border rounded-md sm:mx-2"
              placeholder="Enter URL"
            />
            <button
              type="button"
              onClick={handleShort}
              className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Shortening..." : "Get Started"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {shortenedUrl && (
            <p className="text-green-500">Shortened URL: {shortenedUrl}</p>
          )}
          <UrlList />
        </div>
      </section>
    </>
  );
}

export default App;
