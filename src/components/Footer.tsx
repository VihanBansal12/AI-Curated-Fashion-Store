export default function Footer() {
  return (
    <footer className="bg-primary text-secondary py-12 px-4 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-serif text-xl mb-4">AI Fashion Stylist</h3>
            <p className="text-sm opacity-80 mb-4">
              Your personal AI stylist that knows you better than your mirror.
              Experience fashion that truly understands you.
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl">👗</span>
              <span className="text-2xl">🎨</span>
              <span className="text-2xl">✨</span>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>• Mood-based styling</li>
              <li>• Weather recommendations</li>
              <li>• Virtual wardrobe</li>
              <li>• Shopping integration</li>
              <li>• AI-powered insights</li>
            </ul>
          </div>

          {/* Technology Section */}
          <div>
            <h4 className="font-semibold mb-4">Technology</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>• Next.js 14</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Rule-based AI</li>
              <li>• Responsive Design</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm opacity-60">
            Made with ❤️ and AI • Your personal fashion companion
          </p>
        </div>
      </div>
    </footer>
  );
}