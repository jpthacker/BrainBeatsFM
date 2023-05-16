import logoDark from "../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../public/brainbeats-logo-light-md.png";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page-color">
        <div className="p-48 flex flex-col justify-center items-center">
          <picture className="flex flex-col items-center justify-center h-full w-64">
            <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
            <Image src={logoLight} alt="My image" width={400} height={400} />
          </picture>
          <p className="text-center my-16 font-bold mx-6">BrainBeatsFM is an innovative project that leverages the power of artificial intelligence to create unique and personalized music listening experiences. Built with cutting-edge technologies like machine learning and natural language processing, this project provides a platform for discovering, sharing, and creating AI-generated music. With BrainBeatsFM, the future of music is at your fingertips.</p>
          <div>
            <a className="mt-6 px-16 mr-4 py-3 bg-gradient-to-r from-orange-600 to-pink-400 rounded-md self-center font-bold hover:cursor-pointer hover:bg-none hover:bg-rose-400" href="/signup">Sign Up</a>
            <a className="mt-6 px-16 py-3 ml-4 bg-gradient-to-r from-orange-600 to-pink-400 rounded-md self-center font-bold hover:cursor-pointer hover:bg-none hover:bg-rose-400" href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  )
}
