// sharedStyles.ts
export const styles = {
    // Typography
    headingHero: "text-7xl md:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter",
    labelOverline: "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block",
    textBodyHero: "text-gray-700 max-w-2xl text-lg md:text-xl font-medium leading-relaxed",

    // Hero-on-image (headline sits over the photo, so these are white/light variants)
    heroSection: "relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-gray-100",
    heroImage: "absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out",
    heroOverlay: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none",
    heroContent: "relative z-10 h-full flex flex-col justify-end p-6 md:p-12",
    labelOverlineLight: "text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 block",
    headingHeroLight: "text-7xl md:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter text-white",
    textBodyHeroLight: "text-white/80 max-w-2xl text-lg md:text-xl font-medium leading-relaxed",

    // Filter Block
    filterContainer: "border-2 border-black flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    filterBox: "flex-1 p-6 flex flex-col justify-center focus-within:bg-gray-50 transition-colors relative",
    filterInput: "w-full outline-none font-bold text-lg md:text-xl bg-transparent placeholder-gray-300 uppercase",

    // Buttons
    btnPrimary: "bg-black text-white p-6 md:px-12 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors cursor-pointer group disabled:bg-gray-400 shrink-0",
    btnOutline: "border-2 border-black px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-colors flex items-center gap-2",

    // Cards
    resultCard: "group border border-gray-200 p-12 flex flex-col items-center justify-center text-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer h-[300px]"
};
