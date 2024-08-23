'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'

export default function Component() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100
    const weightInKg = parseFloat(weight)

    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      alert('Please enter valid height and weight values.')
      return
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters)
    setBmi(parseFloat(bmiValue.toFixed(1)))

    if (bmiValue < 18.5) {
      setCategory('Underweight')
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight')
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight')
    } else {
      setCategory('Obese')
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-yellow-500 border-yellow-500'
      case 'Normal weight':
        return 'text-green-500 border-green-500'
      case 'Overweight':
        return 'text-orange-500 border-orange-500'
      case 'Obese':
        return 'text-red-500 border-red-500'
      default:
        return 'text-gray-500 border-gray-500'
    }
  }

  const HealthResources = ({ category }: { category: string }) => {
    const resources = {
      'Underweight': [
        { name: 'CDC - Underweight', url: 'https://www.cdc.gov/healthy-weight-growth/about/index.html' },
        { name: 'NHS - Underweight adults', url: 'https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/advice-for-underweight-adults/' },
      ],
      'Normal weight': [
        { name: 'CDC - Healthy Weight', url: 'https://www.cdc.gov/healthyweight/index.html' },
        { name: 'WHO - Healthy diet', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
      ],
      'Overweight': [
        { name: 'CDC - Losing Weight', url: 'https://www.cdc.gov/healthy-weight-growth/losing-weight/?CDC_AAref_Val=https://www.cdc.gov/healthyweight/losing_weight/index.html' },
        { name: 'CDC - Overweight', url: ' https://www.cdc.gov/healthy-weight-growth/food-activity/overweight-obesity-impacts-health.html?CDC_AAref_Val=https://www.cdc.gov/healthyweight/effects/index.html' },
        { name: 'NHS - Losing weight', url: 'https://www.nhs.uk/better-health/lose-weight/' },
      ],
      'Obese': [
        { name: 'CDC - Obesity', url: 'https://www.cdc.gov/obesity/index.html' },
        { name: 'WHO - Obesity', url: 'https://www.who.int/health-topics/obesity' },
      ],
    }

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Health Resources:</h3>
        <ul className="space-y-2">
          {resources[category].map((resource, index) => (
            <li key={index}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                {resource.name}
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
        {bmi !== null && (
          <div className={`text-center p-4 border-2 rounded-lg ${getCategoryColor(category)} w-full`}>
            <p className="text-2xl font-bold">Your BMI: {bmi}</p>
            <p className={`text-lg font-semibold ${getCategoryColor(category)}`}>
              Category: {category}
            </p>
            <HealthResources category={category} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}