export const CancelButton = ({ setIsOpen }) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 
                    dark:hover:bg-gray-500 text-black dark:text-white transition"
    >
      Cancel
    </button>
  );
};

export const SubmitButton = ({body}) => {
  return (
    <button
      type="submit"
      className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
      onClick={() => {
        handleSubmit()
      }}
    >
      Submit
    </button>
  );
};

export const GeneralButton = ({text, style}) => {
  
}
