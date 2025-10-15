"use client";

import { useState, useEffect, useMemo } from "react";
import { Location } from "../data/types";
import { CompactButton } from "./CompactButton";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type LocationWithId = Location & { _id?: string };

export default function LocationsEditClient() {
  const [locations, setLocations] = useState<LocationWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState<LocationWithId | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("edit");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Fetch locations
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/locations");
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocations(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Filter locations based on search
  const filteredLocations = useMemo(() => {
    if (!searchTerm) return locations;

    const term = searchTerm.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.companyName?.toLowerCase().includes(term) ||
        loc.city?.toLowerCase().includes(term) ||
        loc.state?.toLowerCase().includes(term) ||
        loc.facilityType?.toLowerCase().includes(term) ||
        loc.companyCodeId?.toLowerCase().includes(term)
    );
  }, [locations, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const paginatedLocations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLocations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLocations, currentPage]);

  // Handle create new
  const handleCreateNew = () => {
    setEditMode("create");
    setSelectedLocation({
      companyName: "",
      companyAddress: "",
      companyWebsite: "",
      facilityType: "",
      companyCodeId: "",
      latitude: "",
      longitude: "",
    });
    setIsDialogOpen(true);
  };

  // Handle edit
  const handleEdit = (location: LocationWithId) => {
    setEditMode("edit");
    setSelectedLocation({ ...location });
    setIsDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async (location: LocationWithId) => {
    if (!location._id) return;

    if (
      !confirm(
        `Are you sure you want to delete ${location.companyName}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/locations/${location._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete location");

      await fetchLocations();
      alert("Location deleted successfully");
    } catch (err) {
      alert(
        `Error deleting location: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!selectedLocation) return;

    // Validate required fields
    if (
      !selectedLocation.companyName ||
      !selectedLocation.facilityType ||
      !selectedLocation.companyCodeId
    ) {
      alert(
        "Please fill in all required fields: Company Name, Facility Type, and Company Code ID"
      );
      return;
    }

    try {
      const method = editMode === "create" ? "POST" : "PUT";
      const url =
        editMode === "create"
          ? "/api/locations"
          : `/api/locations/${selectedLocation._id}`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedLocation),
      });

      if (!response.ok) throw new Error("Failed to save location");

      await fetchLocations();
      setIsDialogOpen(false);
      setSelectedLocation(null);
      alert(
        `Location ${editMode === "create" ? "created" : "updated"} successfully`
      );
    } catch (err) {
      alert(
        `Error saving location: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  };

  // Update field
  const updateField = (field: keyof Location, value: string) => {
    if (selectedLocation) {
      setSelectedLocation({ ...selectedLocation, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-[1440px] px-4 py-8">
        <Skeleton className="mb-4 h-10 w-64" />
        <Skeleton className="mb-8 h-10 w-full max-w-md" />
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-blue-300">
          Manage Locations
        </h1>
        <p className="text-gray-600">
          Total Locations: {locations.length} | Filtered:{" "}
          {filteredLocations.length}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          type="text"
          placeholder="Search by name, city, state, facility type, or code..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-md"
        />
        <div className="flex gap-2">
          <CompactButton onClick={handleCreateNew} variant="primary">
            + Add New Location
          </CompactButton>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold">
                Company Name
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold">
                Address
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold">
                City, State
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold">
                Facility Type
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold">
                Code ID
              </th>
              <th className="border-b px-4 py-3 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLocations.map((location) => (
              <tr
                key={location._id || location.companyCodeId}
                className="hover:bg-gray-50"
              >
                <td className="border-b px-4 py-3 text-sm">
                  {location.companyName}
                </td>
                <td className="border-b px-4 py-3 text-sm">
                  {location.companyAddress || "-"}
                </td>
                <td className="border-b px-4 py-3 text-sm">
                  {location.city && location.state
                    ? `${location.city}, ${location.state}`
                    : "-"}
                </td>
                <td className="border-b px-4 py-3 text-sm">
                  {location.facilityType}
                </td>
                <td className="border-b px-4 py-3 text-sm">
                  {location.companyCodeId}
                </td>
                <td className="border-b px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <CompactButton
                      onClick={() => handleEdit(location)}
                      variant="secondary"
                    >
                      Edit
                    </CompactButton>
                    <CompactButton
                      onClick={() => handleDelete(location)}
                      variant="danger"
                      disabled={isDeleting}
                    >
                      Delete
                    </CompactButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <CompactButton
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="secondary"
            >
              Previous
            </CompactButton>
            <CompactButton
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="secondary"
            >
              Next
            </CompactButton>
          </div>
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode === "create" ? "Add New Location" : "Edit Location"}
            </DialogTitle>
            <DialogDescription>
              {editMode === "create"
                ? "Fill in the details for the new location."
                : "Update the location information below."}
            </DialogDescription>
          </DialogHeader>

          {selectedLocation && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={selectedLocation.companyName || ""}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Company Address</label>
                <Input
                  value={selectedLocation.companyAddress || ""}
                  onChange={(e) =>
                    updateField("companyAddress", e.target.value)
                  }
                  placeholder="Enter address"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Company Website</label>
                <Input
                  value={selectedLocation.companyWebsite || ""}
                  onChange={(e) =>
                    updateField("companyWebsite", e.target.value)
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Facility Type <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={selectedLocation.facilityType || ""}
                    onChange={(e) =>
                      updateField("facilityType", e.target.value)
                    }
                    placeholder="e.g., JCRF, ACRS"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Company Code ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={selectedLocation.companyCodeId || ""}
                    onChange={(e) =>
                      updateField("companyCodeId", e.target.value)
                    }
                    placeholder="Enter code ID"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Latitude</label>
                  <Input
                    value={selectedLocation.latitude || ""}
                    onChange={(e) => updateField("latitude", e.target.value)}
                    placeholder="e.g., 30.451548"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Longitude</label>
                  <Input
                    value={selectedLocation.longitude || ""}
                    onChange={(e) => updateField("longitude", e.target.value)}
                    placeholder="e.g., -91.175778"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Street Number</label>
                  <Input
                    value={selectedLocation.number || ""}
                    onChange={(e) => updateField("number", e.target.value)}
                    placeholder="e.g., 1306"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Street Name</label>
                  <Input
                    value={selectedLocation.street || ""}
                    onChange={(e) => updateField("street", e.target.value)}
                    placeholder="e.g., Main St"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={selectedLocation.city || ""}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Enter city"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">State</label>
                  <Input
                    value={selectedLocation.state || ""}
                    onChange={(e) => updateField("state", e.target.value)}
                    placeholder="e.g., LA"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">ZIP Code</label>
                  <Input
                    value={selectedLocation.zip || ""}
                    onChange={(e) => updateField("zip", e.target.value)}
                    placeholder="e.g., 70802"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={selectedLocation.country || ""}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="e.g., US"
                  />
                </div>

                <div className="col-span-2 grid gap-2">
                  <label className="text-sm font-medium">County</label>
                  <Input
                    value={selectedLocation.county || ""}
                    onChange={(e) => updateField("county", e.target.value)}
                    placeholder="Enter county"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <CompactButton
              variant="secondary"
              onClick={() => {
                setIsDialogOpen(false);
                setSelectedLocation(null);
              }}
            >
              Cancel
            </CompactButton>
            <CompactButton onClick={handleSave} variant="primary">
              {editMode === "create" ? "Create" : "Save Changes"}
            </CompactButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
