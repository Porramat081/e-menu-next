import { Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-black text-white p-4 pb-8">
      <div className="container max-w-[1200px] mx-auto">
        <h1 className="font-bold text-2xl mb-3">FoodCheck</h1>
        <div className="grid grid-cols-3 justify-items-center">
          <div className="footer-container">
            <div className="font-semibold">Features</div>
            <div>Menu Adding</div>
            <div>Menu Looking</div>
            <div>Menu Updating</div>
          </div>

          <div className="footer-container">
            <div className="font-semibold">Support</div>
            <div>Contact Us</div>
          </div>

          <div className="footer-container">
            <div className="font-semibold">About Us</div>
            <div>Company</div>
            <div>Blog</div>
          </div>
        </div>
        <hr className="text-white my-8" />

        <div className="flex flex-col md:px-4 gap-4 md:justify-between md:flex-row">
          <div className="flex items-center gap-2 justify-center link-container">
            <div className="border p-1">
              <Facebook size={16} />
            </div>
            <div className="border p-1">
              <Instagram size={16} />
            </div>
            <div className="border p-1">
              <Twitter size={16} />
            </div>
            <div className="border p-1">
              <Linkedin size={16} />
            </div>
          </div>

          <div className="md:flex md:gap-2 grid grid-cols-2 justify-items-center link-container">
            <div>Terms</div>
            <div>Privacy Policy</div>
            <div>Payment Policy</div>
            <div>Copyright © 2025 FoodCheck</div>
          </div>
        </div>
      </div>
    </div>
  );
}
