export default function Hero() {
  return (
    <div className="bg-[url('/pic/heroImage.jpg')] bg-cover bg-center h-screen pb-40 relative flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-contrast-80"></div>

      <div className="flex flex-col relative gap-4 md:gap-6 text-center text-white">
        <div className="font-bold text-3xl md:text-6xl">Food Connected</div>
        <div className="font-semibold text-2xl md:text-4xl">
          Elevate foody experience. Drive customer loyalty and business growth.
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="cursor-pointer rounded-xl text-xl bg-linear-to-r from-pink-500 to-pink-100 px-4 py-2 transition duration-300 ease-in-out 
               hover:scale-110"
          >
            Look a demo
          </button>
        </div>
      </div>
    </div>
  );
}
