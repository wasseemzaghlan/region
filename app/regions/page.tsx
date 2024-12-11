"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegionsTab } from "@/components/regions/regions-tab";
import { CountiesTab } from "@/components/regions/counties-tab";
import { CitiesTab } from "@/components/regions/cities-tab";
import { useState } from "react";
import { Region, County, City } from "@/types/region";
import { regions as initialRegions } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>(initialRegions);

  const handleAddRegion = (data: { name: string }) => {
    const newRegion: Region = {
      id: String(regions.length + 1),
      name: data.name,
      counties: [],
    };
    setRegions([...regions, newRegion]);
  };

  const handleEditRegion = (id: string, data: { name: string }) => {
    setRegions(
      regions.map((region) =>
        region.id === id ? { ...region, name: data.name } : region
      )
    );
  };

  const handleDeleteRegion = (id: string) => {
    setRegions(regions.filter((region) => region.id !== id));
  };

  const handleAddCounty = (data: { name: string; regionId: string }) => {
    const newCounty: County = {
      id: String(Date.now()),
      name: data.name,
      regionId: data.regionId,
      cities: [],
    };
    setRegions(
      regions.map((region) =>
        region.id === data.regionId
          ? { ...region, counties: [...region.counties, newCounty] }
          : region
      )
    );
  };

  const handleEditCounty = (id: string, data: { name: string; regionId: string }) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) =>
          county.id === id ? { ...county, name: data.name, regionId: data.regionId } : county
        ),
      }))
    );
  };

  const handleDeleteCounty = (countyId: string) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.filter((county) => county.id !== countyId),
      }))
    );
  };

  const handleAddCity = (data: { name: string; countyId: string }) => {
    const newCity: City = {
      id: String(Date.now()),
      name: data.name,
      countyId: data.countyId,
    };
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) =>
          county.id === data.countyId
            ? { ...county, cities: [...county.cities, newCity] }
            : county
        ),
      }))
    );
  };

  const handleEditCity = (id: string, data: { name: string; countyId: string }) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) => ({
          ...county,
          cities: county.cities.map((city) =>
            city.id === id ? { ...city, name: data.name, countyId: data.countyId } : city
          ),
        })),
      }))
    );
  };

  const handleDeleteCity = (cityId: string) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) => ({
          ...county,
          cities: county.cities.filter((city) => city.id !== cityId),
        })),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Region Management
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <Tabs defaultValue="regions" className="space-y-6">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full sm:w-auto">
              <TabsTrigger value="regions" className="w-full sm:w-auto">
                Regions
              </TabsTrigger>
              <TabsTrigger value="counties" className="w-full sm:w-auto">
                Counties
              </TabsTrigger>
              <TabsTrigger value="cities" className="w-full sm:w-auto">
                Cities
              </TabsTrigger>
            </TabsList>
            <TabsContent value="regions">
              <RegionsTab
                regions={regions}
                onAdd={handleAddRegion}
                onEdit={handleEditRegion}
                onDelete={handleDeleteRegion}
              />
            </TabsContent>
            <TabsContent value="counties">
              <CountiesTab
                regions={regions}
                onAdd={handleAddCounty}
                onEdit={handleEditCounty}
                onDelete={handleDeleteCounty}
              />
            </TabsContent>
            <TabsContent value="cities">
              <CitiesTab
                regions={regions}
                onAdd={handleAddCity}
                onEdit={handleEditCity}
                onDelete={handleDeleteCity}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}