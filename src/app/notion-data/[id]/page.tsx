"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    };
  };
}

export default function NotionDetailsPage() {
  const params = useParams();
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

  const item = data.QUERY_RESPONSE_KEY_RESULT.PRIMARY_DATABASE.BLOCKS.find(
    (block) => block.METADATA.id.VALUE === params.id
  );

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Item not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <a
          href="/notion-data"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
        >
          ← Back to list
        </a>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {item.PROPERTIES.Image.VALUE[0] && (
            <img
              src={item.PROPERTIES.Image.VALUE[0]}
              alt={item.PROPERTIES.Title.VALUE}
              className="w-full h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">
              {item.PROPERTIES.Title.VALUE}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              {item.PROPERTIES.Description.VALUE}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {item.PROPERTIES["Tag 1"].VALUE && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {item.PROPERTIES["Tag 1"].VALUE}
                </span>
              )}
              {item.PROPERTIES["Tag 2"].VALUE && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {item.PROPERTIES["Tag 2"].VALUE}
                </span>
              )}
            </div>
            
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold">Created</p>
                  <p>
                    {new Date(
                      item.PROPERTIES["Creation Date"].VALUE
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Last edited</p>
                  <p>
                    {new Date(
                      item.PROPERTIES["Last Edit Date"].VALUE
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 