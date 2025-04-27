import MemberOnly from "@/components/MemberOnly";
import Image from "next/image";
import Link from "next/link";

export default function MemberHome() {
  return (
    <MemberOnly>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 font-secondary">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/member/saved-properties"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <h3 className="font-medium">Saved Properties</h3>
                <p className="text-sm text-gray-600 font-secondary">View your favorite listings</p>
              </Link>
              <Link
                href="/member/search-history"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <h3 className="font-medium">Search History</h3>
                <p className="text-sm text-gray-600 font-secondary">Review your recent searches</p>
              </Link>
              <Link
                href="/member/preferences"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <h3 className="font-medium">Preferences</h3>
                <p className="text-sm text-gray-600 font-secondary">Update your account settings</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 font-secondary">2 hours ago</p>
                <p className="font-medium">Saved a new property</p>
                <p className="text-sm text-gray-600 font-secondary">123 Main Street, City, State</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 font-secondary">Yesterday</p>
                <p className="font-medium">Updated search preferences</p>
                <p className="text-sm text-gray-600 font-secondary">Added new filters for price range</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 font-secondary">3 days ago</p>
                <p className="font-medium">Viewed property details</p>
                <p className="text-sm text-gray-600 font-secondary">456 Oak Avenue, City, State</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MemberOnly>
  );
} 