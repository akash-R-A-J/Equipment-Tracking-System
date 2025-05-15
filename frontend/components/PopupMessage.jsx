import { useState } from "react";

export const PopupMessage = ({ message }) => {
  const [closePopup, setClosePopup] = useState(false);

  return (
    !closePopup && (
      <div className="z-50 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 w-96">
          <p className="mb-4">{message}</p>
          <div className="flex justify-end">
            <button
              className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded ${
                message === "loading..." ? "hidden" : "block"
              }`}
              onClick={() => setClosePopup(true)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};
