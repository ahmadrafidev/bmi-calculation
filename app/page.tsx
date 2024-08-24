import BMICalculator from '@/components/bmi-calculator'
import DarkModeToggle from '@/components/ui/DarkModeToggle'

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <header className="p-3 absolute top-0 right-0">
        <DarkModeToggle />
      </header>
      <h1 className="text-2xl md:text-4xl font-bold font-sans tracking-tight mb-8 text-center">
        BMI Calculator App
      </h1>
      <BMICalculator />
    </main>
  )
}