import React, { useEffect, useState } from "react";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
  const [urlList, setUrlList] = useState([]);
  console.log(import.meta.env.VITE_FRONTEND_URI) 
  useEffect(() => {
    fetch(`${import.meta.env.VITE_FRONTEND_URI}/api/getallurls`)
      .then((response) => response.json())
      .then((data) => setUrlList(data))
  }, []);

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2 max-w-md mx-auto">
        {urlList.length  && urlList.map((url) => (
          <li key={url.shortid} className="flex items-center justify-between gap-2 border-[1px] border-slate-200 rounded-md p-2">
            <a className="text-blue-500" target="_blank" rel="noopener noreferrer" href={url.url}>
              {import.meta.env.VITE_FRONTEND_URI + '/' + url.shortid}
            </a>
            <div className="flex items-center gap-2">
              <button
                className="text-muted-foreground hover:bg-muted"
                variant="ghost"
                size="icon">
                <CopyIcon className="w-4 h-4" />
                <span className="sr-only">Copy</span>
              </button>
              <span className="flex items-center">
                <EyeIcon className="w-4 h-4" />
                {url.visitHistory.length} view{url.visitHistory.length !== 1 ? 's' : ''}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
