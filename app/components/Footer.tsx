export default function Footer() {
  return (
    <footer className="w-full border-t mt-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-6 text-center space-y-1">

        <p className="text-[var(--kiul-text-soft)] text-xs">
          © {new Date().getFullYear()} Katoki Institute for Ubuntu Leadership (KIUL)
        </p>

        <p className="text-[var(--kiul-text-soft)] text-xs">
          Promoting Ubuntu leadership, scholarship, and community empowerment in Africa.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-xs text-[var(--kiul-text-soft)] pt-1">
          <a 
            href="https://wa.me/255758624863" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--kiul-green)] transition"
          >
            <span>📱</span>
            <span>WhatsApp: +255 758 624 863</span>
          </a>
          <span className="hidden sm:inline">•</span>
          <a 
            href="mailto:info.kiul@katokifoundation.org"
            className="flex items-center gap-2 hover:text-[var(--kiul-green)] transition"
          >
            <span>✉️</span>
            <span>Email: info.kiul@katokifoundation.org</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
