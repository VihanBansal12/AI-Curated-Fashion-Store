import QuickInput from '@/components/QuickInput'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-heading font-serif text-primary mb-4">
            Your Personal AI Stylist
          </h1>
          <p className="text-body text-ui-gray max-w-2xl mx-auto">
            Experience fashion that understands you better than your mirror.
            Get personalized outfit recommendations based on your mood, weather, and events.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <QuickInput />
        </div>
      </div>
    </main>
  )
}