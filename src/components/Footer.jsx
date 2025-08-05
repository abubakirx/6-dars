const Footer = () => {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
