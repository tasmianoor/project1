"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from '@/components/ui/Button';

interface NotionData {
  QUERY_RESPONSE_KEY_SUCCESS: boolean;
  QUERY_RESPONSE_KEY_RESULT: {
    PRIMARY_DATABASE: {
      BLOCKS: Array<{
        METADATA: {
          id: { TYPE: string; VALUE: string };
          cover: { TYPE: null; VALUE: null };
          icon: { TYPE: null; VALUE: null };
        };
        PROPERTIES: {
          Author: {
            TYPE: string;
            VALUE: Array<{
              RELATION_DATABASE_ID: string;
              RELATION_PAGE_ID: string;
            }>;
          };
          Image: { TYPE: string; VALUE: string[] };
          "Tag 2": { TYPE: string; VALUE: string };
          "Tag 1": { TYPE: string; VALUE: string };
          Title: { TYPE: string; VALUE: string };
          Status: { TYPE: string; VALUE: null };
          "Tag 3": { TYPE: string; VALUE: null };
          "Last Edit Date": { TYPE: string; VALUE: string };
          "Creation Date": { TYPE: string; VALUE: string };
          Relation: {
            TYPE: string;
            VALUE: Array<{
              RELATION_DATABASE_ID: string;
              RELATION_PAGE_ID: string;
            }>;
          };
          "Upload Date": {
            TYPE: string;
            VALUE: { START_DATE: string; END_DATE: null; TIME_ZONE: null };
          };
          Description: { TYPE: string; VALUE: string };
        };
      }>;
      DATABASE_ID: string;
      DATABASE_TITLE: string;
      DATABASE_DESCRIPTION: string;
      PARENT_ID: string;
      PARENT_TITLE: string;
      PARENT_TYPE: string;
      icon: string;
      cover: null;
    };
    INCLUDE_RELATION_DATABASES: boolean;
  };
}

export default function StoriesPage() {
  const [data, setData] = useState<NotionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/notion");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col items-center">
      <h2 className="w-full text-[32px] sm:text-[44px] font-bold mb-4 sm:mb-6 lg:mb-8 font-['Outfit'] section-label text-left">Stories</h2>
      <div className="grid grid-cols-[352px] sm:grid-cols-[352px_352px] lg:grid-cols-[352px_352px_352px] gap-x-[20px] gap-y-[20px] justify-items-center">
        {data.QUERY_RESPONSE_KEY_RESULT.PRIMARY_DATABASE.BLOCKS.map((block) => (
          <Link
            href={`/stories/${block.METADATA.id.VALUE}`}
            key={block.METADATA.id.VALUE}
            className="block transition-transform hover:scale-[1.02] w-[352px] h-[352px]"
          >
            <div 
              className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-shadow duration-300 overflow-hidden cursor-pointer relative w-full h-full rounded-lg"
              style={{
                backgroundImage: block.PROPERTIES.Image.VALUE[0] ? `url(${block.PROPERTIES.Image.VALUE[0]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
              />
              <div className="p-3 sm:p-4 absolute bottom-0 left-0 right-0 text-white">
                <h3 className="text-[24px] sm:text-[32px] font-semibold mb-1 sm:mb-2 font-['Outfit']">
                  {block.PROPERTIES.Title.VALUE}
                </h3>
                <p className="text-[14px] text-gray-200 mb-2 sm:mb-4 font-['Hepta_Slab'] line-clamp-2">
                  {block.PROPERTIES.Description.VALUE}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {block.PROPERTIES["Tag 1"].VALUE && (
                    <Button variant="ghost" className="bg-black text-white hover:bg-black/80 border-0">
                      {block.PROPERTIES["Tag 1"].VALUE}
                    </Button>
                  )}
                  {block.PROPERTIES["Tag 2"].VALUE && (
                    <Button variant="ghost" className="bg-black text-white hover:bg-black/80 border-0">
                      {block.PROPERTIES["Tag 2"].VALUE}
                    </Button>
                  )}
                </div>
                <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-300 font-['Hepta_Slab']">
                  <p>
                    {new Date(
                      block.PROPERTIES["Creation Date"].VALUE
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 