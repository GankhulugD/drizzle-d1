export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      {/* Red strip */}
      <div className="bg-[#E63946] py-2 text-center text-white text-xs font-semibold uppercase tracking-wider">
        Fresh fast delivered · Fresh fast delivered · Fresh fast delivered
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-[#E63946] rounded-full flex items-center justify-center">
              <span className="text-white font-black text-sm">NN</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm">NomNom</div>
              <div className="text-gray-500 text-xs">Swift delivery</div>
            </div>
          </div>
          <p className="text-xs leading-relaxed">
            Fresh food delivered fast to your door.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Menu</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">Appetizers</a></li>
            <li><a href="#" className="hover:text-white transition">Main Course</a></li>
            <li><a href="#" className="hover:text-white transition">Salads</a></li>
            <li><a href="#" className="hover:text-white transition">Desserts</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">Help center</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms</a></li>
            <li><a href="#" className="hover:text-white transition">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs">
        © {new Date().getFullYear()} NomNom. All rights reserved.
      </div>
    </footer>
  );
}
