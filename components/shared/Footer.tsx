import Link from "next/link";
import { Facebook, Twitter, Rss, Globe, Image } from "lucide-react";

export default function Footer() {
  return (
    <footer className="z-20 mt-12 py-8 text-white shadow backdrop-blur-3xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="absolute col-span-1 md:col-span-2">
            <h2 className="mb-2 text-2xl font-bold">EventZone</h2>
            <p className="text-sm">BRING YOUR DREAM TO REALITY</p>
          </div>
          {/* <div>
            <h3 className="mb-4 text-lg font-semibold">EventZone Themes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  PRE-SALE FAQS
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  SUBMIT A TICKET
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  THEME TWEAK
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Showcase</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  WIDGETKIT
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  SUPPORT
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="mb-6 flex justify-center space-x-4">
          <Link href="#" className="text-white hover:text-gray-400">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-white hover:text-gray-400">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-white hover:text-gray-400">
            <Rss size={20} />
            <span className="sr-only">RSS</span>
          </Link>
          <Link href="#" className="text-white hover:text-gray-400">
            <Globe size={20} />
            <span className="sr-only">Website</span>
          </Link>
          <Link href="#" className="text-white hover:text-gray-400">
            <Image size={20} />
            <span className="sr-only">Image Sharing</span>
          </Link>
        </div>
        <div className="text-center text-sm">
          <p>&copy; 2024 EventZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
