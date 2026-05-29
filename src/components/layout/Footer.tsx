import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-4"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "#000000",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-white">
            Noir P. Purba
          </span>
          <span style={{ color: "#3a3a3c" }}>·</span>
          <span className="text-xs" style={{ color: "#7a7a7a" }}>
            {profile.department}, {profile.institutionShort}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.contact.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "#7a7a7a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2997ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7a7a7a";
            }}
          >
            Google Scholar
          </a>
          <a
            href={profile.contact.researchgate}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "#7a7a7a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2997ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7a7a7a";
            }}
          >
            ResearchGate
          </a>
          <a
            href={profile.contact.theconversation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "#7a7a7a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2997ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7a7a7a";
            }}
          >
            The Conversation
          </a>
        </div>

        <p className="text-xs" style={{ color: "#3a3a3c" }}>
          &copy; {year} Noir Primadona Purba
        </p>
      </div>
    </footer>
  );
}
