import React, { useCallback } from "react";
import { Input } from "../../ui/input";
import { NativeSelect } from "../../ui/native-select";

interface FilterInputsProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  zipFilter: string;
  setZipFilter: (value: string) => void;
  distanceFilter: number | null;
  setDistanceFilter: (value: number | null) => void;
}

export const FilterInputs = React.memo(
  ({
    nameFilter,
    setNameFilter,
    zipFilter,
    setZipFilter,
    distanceFilter,
    setDistanceFilter,
  }: FilterInputsProps) => {
    const handleNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);
      },
      [setNameFilter]
    );

    const handleZipChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipFilter(e.target.value);
      },
      [setZipFilter]
    );

    const handleDistanceChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistanceFilter(e.target.value ? Number(e.target.value) : null);
      },
      [setDistanceFilter]
    );

    return (
      <div className="flex flex-col gap-2">
        <Input
          id="locationName"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={handleNameChange}
          className="h-[47.5px] flex-1"
        />
        <div className="flex flex-1 gap-2">
          <Input
            id="locationZip"
            placeholder="Enter ZIP code..."
            value={zipFilter}
            onChange={handleZipChange}
            className="h-[47.5px] flex-1"
          />
          <NativeSelect
            value={distanceFilter || ""}
            disabled={!zipFilter}
            defaultValue="10"
            onChange={handleDistanceChange}
            className={"h-[47.5px] flex-1"}
            id="locationDistance"
          >
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
            <option value="100">100 miles</option>
          </NativeSelect>
        </div>
      </div>
    );
  }
);

FilterInputs.displayName = "FilterInputs";
