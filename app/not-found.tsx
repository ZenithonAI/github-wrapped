export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient mb-4">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
        <a href="/" className="text-primary-400 hover:text-primary-300">
          Return home
        </a>
      </div>
    </div>
  )
}