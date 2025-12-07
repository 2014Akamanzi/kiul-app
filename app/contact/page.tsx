export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-semibold text-[#064e3b]">
          Contact Us
        </h1>

        {/* UNDERLINE */}
        <div className="w-24 h-1 bg-[#a7c8bb] mt-3 mb-10"></div>

        {/* INTRO PARAGRAPH */}
        <p className="text-lg leading-relaxed text-[#1a1a1a] mb-10">
          You are welcome to reach out to the Katoki Institute for Ubuntu Leadership 
          (KIUL) for inquiries, collaborations, programme information, or general 
          communication. We value meaningful connections rooted in Ubuntu, and we 
          look forward to hearing from you.
        </p>

        {/* CONTACT INFORMATION */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8e4] mb-10">
          <h2 className="text-xl font-semibold text-[#064e3b] mb-4">Contact Information</h2>

          <p className="leading-relaxed text-[#1a1a1a] mb-2">
            <strong>WhatsApp:</strong> +255-758624863 (WhatsApp only)
          </p>

          <p className="leading-relaxed text-[#1a1a1a] mb-2">
            <strong>Email:</strong> info.kiul@katokifoundation.org
          </p>

          <p className="leading-relaxed text-[#1a1a1a] mt-4">
            We aim to respond to messages within 48 hours.
          </p>
        </div>

        {/* FUTURE FORM PLACEHOLDER */}
        <p className="text-sm text-[#4a4a4a] italic">
          A contact form will be added here in future updates.
        </p>

      </div>
    </main>
  );
}
