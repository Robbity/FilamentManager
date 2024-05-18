import "./FilamentControl.css";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { ResponsivePie } from "@nivo/pie";
import { fetchFilament, updateFilament } from "./filamentApi";
import { ReactComponent as SaveIcon } from "./icons/save.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";

const FilamentControl = ({ filamentId }) => {
  const [filament, setFilament] = useState({ remaining: 0, total: 0 });
  const [draftFilament, setDraftFilament] = useState({
    remaining: 0,
    total: 0,
  });
  const [selectedRefill, setSelectedRefill] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFilament(filamentId);
        setFilament({
          remaining: data.filamentCurr,
          total: data.filamentTotal,
        });
        setDraftFilament({
          remaining: data.filamentCurr,
          total: data.filamentTotal,
        });
      } catch (error) {
        console.error("Error fetching filament data:", error);
      }
    };
    fetchData();
  }, [filamentId]);

  const handleRefill = (amount) => {
    setSelectedRefill((prev) => (prev === amount ? null : amount));
    setDraftFilament({ total: amount, remaining: amount });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setDraftFilament({ ...draftFilament, remaining: Number(e.target.value) });
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (draftFilament.remaining > draftFilament.total) {
      setError("Remaining filament cannot be greater than the total filament.");
      return;
    }

    try {
      const updated = await updateFilament(filamentId, {
        filamentCurr: draftFilament.remaining,
        filamentTotal: draftFilament.total,
      });
      setFilament({
        remaining: updated.filamentCurr,
        total: updated.filamentTotal,
      });
      setIsEditing(false);
      setError(null);
      console.log("Update successful:", updated);
    } catch (error) {
      console.error("Error updating filament data:", error);
    }
  };

  const filamentData = [
    { id: "remaining", label: "Remaining", value: filament.remaining },
    { id: "used", label: "Used", value: filament.total - filament.remaining },
  ];

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={`bg-white rounded-lg shadow-lg space-y-4 box ${
          isEditing ? "expanded" : "collapsed"
        }`}
      >
        <div className="bg-slate-100 flex justify-between items-center p-4">
          <div className="poppins-bold text-lg">Filament Quick Controls</div>
          <div className="rubik-bold text-slate-500">
            {filament.remaining}g / {filament.total}g
          </div>
        </div>
        {error && (
          <div className="error-message text-red-500 text-sm">{error}</div>
        )}
        <div className="flex items-center px-6">
          <div className="w-24 h-24">
            <ResponsivePie
              data={filamentData}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
              innerRadius={0.5}
              activeOuterRadiusOffset={8}
              colors={["#5da8ef", "#00222e"]}
              enableArcLinkLabels={false}
              enableArcLabels={false}
            />
          </div>
          <div>
            <div className="rubik-bold mb-1">Filament Remaining</div>
            <div className="flex gap-5 items-center">
              <div className="input-container">
                <input
                  id="filament-remaining"
                  type="text"
                  value={draftFilament.remaining}
                  onChange={handleInputChange}
                  className="input-with-unit"
                />
                <span className="unit">g</span>
              </div>
              <div className="bg-slate-100 flex px-2 py-1 items-center gap-2 rounded-lg">
                <Button class="rounded-full text-white bg-purple-700 hover:bg-purple-800 rubik-bold">
                  Purple
                </Button>
                <Button class="rounded-full text-white bg-slate-800 rubik-bold">
                  PLA
                </Button>
                <EditIcon className="icon-large" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center px-6">
          <div className="font-medium poppins-bold">Refill</div>
          <div className="flex gap-4 rubik-bold">
            {[0.75, 1, 5, 10].map((kg) => (
              <Button
                key={kg}
                onClick={() => handleRefill(kg * 1000)}
                class={`bg-slate-200 rounded-lg hover:bg-slate-800 hover:text-white ${
                  selectedRefill === kg * 1000 ? "selected" : ""
                }`}
              >
                {kg}kg
              </Button>
            ))}
          </div>
        </div>
        <div
          className={`save-button-container items-center flex flex-col mx-6 ${
            isEditing ? "visible-button" : "hidden-button"
          }`}
        >
          <button
            type="button"
            onClick={handleSaveChanges}
            className="save-button poppins rounded w-full items-center justify-center flex py-2"
          >
            <SaveIcon className="icon-large mr-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilamentControl;
