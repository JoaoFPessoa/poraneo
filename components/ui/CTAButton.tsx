export default function CTAButton() {
  return (
    <div className="pt-8 mt-8 border-t border-white/10">
      <div className="flex flex-col gap-4">
        <button className=" text-black py-4 px-8 rounded-full text-xl font-semibold border border-black/10 transition group">
          entre em contato
          <span className="ml-2 inline-block transition group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
