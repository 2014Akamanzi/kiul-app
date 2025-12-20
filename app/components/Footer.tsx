export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-3">
      <div className="text-center">

        <p className="text-[var(--kiul-text-dark)] text-sm font-semibold">
          © {new Date().getFullYear()} Katoki Institute for Ubuntu Leadership (KIUL)
        </p>

        <p className="text-[var(--kiul-text-soft)] text-xs mt-0.5">
          Promoting Ubuntu leadership, scholarship, and community empowerment in Africa.
        </p>

        <div className="flex flex-wrap gap-2 justify-center items-center text-xs text-[var(--kiul-text-soft)] mt-1">
          <a 
            href="https://wa.me/255758624863" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--kiul-green)] transition"
          >
            <span>📱</span>
            <span>WhatsApp: +255 758 624 863</span>
          </a>
          <span>•</span>
          <a 
            href="mailto:info.kiul@katokifoundation.org"
            className="flex items-center gap-1 hover:text-[var(--kiul-green)] transition"
          >
            <span>✉️</span>
            <span>Email: info.kiul@katokifoundation.org</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
