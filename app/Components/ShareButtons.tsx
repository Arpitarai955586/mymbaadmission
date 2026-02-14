
"use client";

import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Mail,
} from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:opacity-80 transition-opacity font-semibold text-sm"
      >
        <Facebook size={18} />
        <span className="hidden md:inline">Facebook</span>
      </a>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:opacity-80 transition-opacity font-semibold text-sm"
      >
        <Twitter size={18} />
        <span className="hidden md:inline">Twitter</span>
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:opacity-80 transition-opacity font-semibold text-sm"
      >
        <Linkedin size={18} />
        <span className="hidden md:inline">LinkedIn</span>
      </a>

      {/* Email Share */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        className="flex items-center gap-2 px-4 py-2 bg-[#EA4335] text-white rounded-lg hover:opacity-80 transition-opacity font-semibold text-sm"
      >
        <Mail size={18} />
        <span className="hidden md:inline">Email</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors font-semibold text-sm"
      >
        <LinkIcon size={18} />
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};
