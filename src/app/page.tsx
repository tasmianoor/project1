import Image from "next/image";
import Link from "@/components/ui/Link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Featured Properties */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/property-1.jpg"
                  alt="Modern apartment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Modern Apartment</h3>
                <p className="text-gray-600 mb-4">Downtown • 2 Beds • 2 Baths</p>
                <p className="text-2xl font-bold text-orange-500">$450,000</p>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
        <Image
                  src="/images/property-2.jpg"
                  alt="Family house"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Family House</h3>
                <p className="text-gray-600 mb-4">Suburbs • 4 Beds • 3 Baths</p>
                <p className="text-2xl font-bold text-orange-500">$750,000</p>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
            <Image
                  src="/images/property-3.jpg"
                  alt="Luxury condo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Luxury Condo</h3>
                <p className="text-gray-600 mb-4">Waterfront • 3 Beds • 2 Baths</p>
                <p className="text-2xl font-bold text-orange-500">$650,000</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/properties">
              <Button>View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Finding Home
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Our experienced agents will guide you through every step of your home-buying journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
              <p className="text-gray-600">
                We streamline the process to help you find your dream home faster.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Value</h3>
              <p className="text-gray-600">
                We negotiate the best deals to ensure you get the most value for your investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8">
            Join our community of satisfied homeowners and start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
