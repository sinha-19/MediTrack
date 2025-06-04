function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {year} MediTrack. Developed by Saket Kumar Sinha.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">Privacy Policy</span>
              <span className="text-sm">Privacy Policy</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">Terms of Service</span>
              <span className="text-sm">Terms of Service</span>
            </a>
            <a href="mailto:22053271@kiit.ac.in" className="text-gray-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">Contact</span>
              <span className="text-sm">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer