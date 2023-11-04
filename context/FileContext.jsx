import React, { createContext, useState } from "react";

const FileContext = createContext({
  file: null,
  setFile: null,
});

function FileProvider({ children }) {
  const [file, setFile] = useState(null);

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
}

export { FileContext, FileProvider };