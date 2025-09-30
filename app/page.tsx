'use client';

import Image from "next/image";
import { useState, useEffect, useRef, FormEvent } from "react";
import emailjs from '@emailjs/browser';

const puppies = [
  { name: "Ezra", image: "/akita/1244171878972812805.JPG" },
  { name: "Micah", image: "/akita/1491404548938030608.JPG" },
  { name: "Naomi", image: "/akita/1781615302860877844.JPG" },
  { name: "Ruth", image: "/akita/5422541736353772559.JPG" },
  { name: "Caleb", image: "/akita/5896849949904738520.JPG" },
  { name: "Esther", image: "/akita/6043709911109845370.JPG" },
  { name: "Solomon", image: "/akita/6189134406387793747.JPG" },
  { name: "Deborah", image: "/akita/6825560772822493621.JPG" },
  { name: "Joshua", image: "/akita/7987124194413360588.JPG" },
  { name: "Rebekah", image: "/akita/8860338744223544901.JPG" },
  { name: "Eli", image: "/akita/9147544505599686810.JPG" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % puppies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current!,
        'YOUR_PUBLIC_KEY'
      );
      setSubmitMessage('Message sent successfully!');
      form.current?.reset();
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <header className="bg-amber-900 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Akita NM</h1>
          <p className="text-xl mb-2">Premier Akita Dog Breeding Kennel</p>
          <p className="text-lg">Las Cruces, New Mexico</p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Welcome to Our Kennel</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At Akita NM, we are dedicated to breeding healthy, well-tempered Akita puppies in the heart of Las Cruces, New Mexico.
            Our commitment is to preserve the noble characteristics of this magnificent breed while ensuring each puppy finds a loving forever home.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            With years of experience and a passion for the breed, we raise our Akitas with love, care, and attention to their physical and emotional well-being.
          </p>
        </div>
      </section>

      {/* Puppy Slideshow */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-8 text-center">Meet Our Puppies</h2>
          <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
            {puppies.map((puppy, index) => (
              <div
                key={puppy.name}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={puppy.image}
                  alt={puppy.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={index === 0}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-4 px-6">
                  <p className="text-2xl font-bold text-center">{puppy.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {puppies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-amber-900 w-8' : 'bg-amber-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center">Why Choose Akita NM</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Quality Breeding</h3>
              <p className="text-gray-600">Our breeding program focuses on health, temperament, and breed standards.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">Loving Care</h3>
              <p className="text-gray-600">Each puppy receives individual attention and socialization from day one.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3">Lifetime Support</h3>
              <p className="text-gray-600">We provide ongoing guidance and support throughout your Akita&apos;s life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-8 bg-amber-50" id="contact">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-8 text-center">Contact Us</h2>
          <p className="text-center text-gray-700 mb-8">
            Interested in learning more or reserving a puppy? Send us a message!
          </p>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-900 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-800 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitMessage && (
              <p className={`text-center ${submitMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Akita NM. All rights reserved. Las Cruces, New Mexico.
          </p>
        </div>
      </footer>
    </div>
  );
}
