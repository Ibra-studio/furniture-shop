'use client'

import { useState, useEffect } from 'react'
import { Truck, ShieldCheck, Star } from 'lucide-react'

// 1. Liste des annonces (icône + texte)
const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: "Free delivery on orders over KES 50,000 · Pay with M-Pesa, card or bank transfer",
  },
  {
    icon: ShieldCheck,
    text: "Every piece backed by our 10-year craftsmanship warranty",
  },
  {
    icon: Star,
    text: "Autumn 2026 Collection is here , handcrafted in 14 days",
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Déclenche le changement toutes les 3 secondes (3000 ms)
    const interval = setInterval(() => {
      // 1. Déclenche l'animation de sortie
      setIsAnimating(true);

      // 2. Change le contenu à mi-parcours de l'animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length);
        setIsAnimating(false);
      }, 300); // 300ms correspond à la durée de la transition CSS
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="bg-dark text-inverse h-10 flex items-center justify-center overflow-hidden">
      <div className="container-boma flex items-center justify-center px-4">
        <div
          className={`flex items-center justify-center gap-1 lg:gap-3 transition-all duration-300 ease-in-out transform ${
            isAnimating
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <IconComponent 
            aria-hidden="true" 
            className="size-4 shrink-0 lg:size-[18px]" 
            strokeWidth={1.75} 
          />
          <p className="text-xs text-center font-medium lg:text-sm">
            {current.text}
          </p>
        </div>
      </div>
    </div>
  );
}