
export default function Hero() {
    const handleClick = (id: string): void => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    };
    return (
        <div className="relative  bg-deep-indigo pt-16 pb-14 text-custom-cream after:content-[''] after:absolute
    after:inset-0 after:pointer-events-none  after:bg-[repeating-linear-gradient(115deg,rgba(199,154,62,0.08)_0_2px,transparent_2px_34px),repeating-linear-gradient(25deg,rgba(160,71,46,0.10)_0_2px,transparent_2px_40px)]">
            <div className="container relative grid md:grid-cols-[1.1fr_0.9fr]  items-center gap-10 overflow-hidden">
                <div className="relative">
                    <div className="text-xs tracking-[0.14em] uppercase text-gold font-semibold mb-3.5">Lagos · Fabric & Materials</div>
                    <h1 className="text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05] mb-4.5 font-bold">Pick your fabric.<br />Send your order.<br />We handle the rest.</h1>
                    <p className="text-[1.05rem] max-w-[42ch] text-[#d8dcea] mb-7">Cottons, lace, silk and ankara — browse the catalog,
                        choose your quantities, and send the order straight to our WhatsApp.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={() => handleClick('catalog')}
                            className="bg-custom-gold py-3.5 px-6.5 rounded-[30px] text-deep-indigo font-semibold text-[0.95rem] cursor-pointer">
                            Shop the catalog
                        </button>
                        <button
                            onClick={ ()=> handleClick('works')}
                            className="py-3.5 px-6.5 rounded-[30px] cursor-pointer hover:bg-custom-gold hover:text-deep-indigo transition-colors duration-300 ease-in-out
                             border  border-[rgba(247,242,231,0.4)] font-semibold text-[0.95rem]">
                            How it works
                        </button>
                    </div>
                </div>
                <div className="order-first   relative z-1  aspect-4/3 md:order-0 bg-[url('./images/ankara.jpg')] bg-center bg-cover  bg-no-repeat border rounded-[18px]"></div>
            </div>
        </div>
    )
}