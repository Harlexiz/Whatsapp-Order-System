import { handleClick } from '../../utils/scroll.ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'
import hero1 from '../../images/bg-3.jpg'
import hero2 from '../../images/bg-1.jpg'
import hero3 from '../../images/bg-2.jpg'




const images = [
    { id: 1, src: hero1 },
    { id: 2, src: hero2 },
    { id: 3, src: hero3 }
];


export default function Hero() {

    return (
        <div className="relative   min-h-[400px] w-full pt-16 pb-20">
            {/* Background Swiper */}

            <div className='absolute inset-0'>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect='fade'
                    fadeEffect={{
                        crossFade: true // Ensures smooth cross-fading between slides
                    }}
                    spaceBetween={16}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    className='w-full h-full'
                >

                    {images.map((image) => (
                        <SwiperSlide key={image.id} className='h-full'>
                            <img
                                src={image.src}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-[1] bg-black/70" />

            {/*Content */}
            <div className="container  z-2 relative ">

                <div className="text-xs tracking-[0.14em] uppercase text-gold font-semibold mb-3.5 text-white">Lagos · Fabric & Materials</div>
                <h1 className="text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05] mb-4.5 font-bold text-white">Pick your fabric.Send your order.<br />We handle the rest.</h1>
                <p className="text-sm max-w-[42ch] text-[#d8dcea] mb-7">Cottons, lace, silk and ankara — browse the catalog,
                    choose your quantities, and send the order straight to our WhatsApp.
                </p>

                <div className="flex gap-4 flex-wrap">
                    <button
                        onClick={() => handleClick('catalog')}
                        className="bg-custom-gold py-3 px-6.5 rounded-[30px] text-white font-semibold text-sm cursor-pointer">
                        Shop the catalog
                    </button>
                    {/* <button
                        onClick={() => handleClick('works')}
                        className="py-3 px-6.5 rounded-[30px] cursor-pointer text-white hover:bg-custom-gold transition-colors duration-300 ease-in-out
                             border  border-[rgba(247,242,231,0.4)] font-semibold text-sm">
                        How it works
                    </button> */}
                </div>

            </div>



        </div>
    )
}