import Image from "next/image";
import logoDark from "../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../public/brainbeats-logo-light-md.png";
import bgImage from "../../public/landing-background.png";

export default function LandingPage() {
  return (
    <section className="relative">
      <div className="w-screen h-screen absolute z-10 flex flex-col items-center justify-center">
        <div className="px-96 flex flex-col justify-center items-center">
          <picture className="flex flex-col items-center justify-center h-full w-10/12">
            <source
              srcSet={logoDark.src}
              media="(prefers-color-scheme: dark)"
            />
            <Image src={logoLight} alt="My image" width={400} height={400} />
          </picture>
          <p className="text-center my-16 font-bold mx-6">
            BrainBeatsFM is an innovative platform for discovering, sharing, and
            promoting AI-generated music, providing unique and personalized
            music listening experiences. With BrainBeatsFM, the future of music
            is at your fingertips.
          </p>
          <div>
            <a
              className="mt-6 px-16 mr-4 py-3 text-gray-300 bg-gradient-to-r from-orange-600 to-pink-400 rounded-md self-center font-bold hover:cursor-pointer hover:bg-none hover:bg-rose-400"
              href="/signup">
              Try Now
            </a>
            <a
              className="px-16 py-3 ml-4 text-gray-300 bg-gradient-to-r from-teal-600 to-indigo-900 rounded-md self-center font-bold hover:cursor-pointer hover:bg-none hover:bg-cyan-800"
              href="/login">
              Sign In
            </a>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen absolute z-0 dark:bg-gradient-to-r from-[#222558] to-[#202136] mix-blend-soft-light">
        <Image
          className="w-full h-full object-fill"
          src={bgImage}
          width="0"
          height="0"
          sizes="100vw"
          alt="background image"></Image>
      </div>
    </section>
  );
}
