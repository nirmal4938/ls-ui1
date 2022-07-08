import React, { useState } from "react";
import { HeaderComp } from "./Component1.jsx";
import { Paper } from "@mui/material";
import { TableComp } from "./Component2.jsx";
const MainComp = ({ a, b }) => {
  const [selectedOption, setSelectedOption] = useState({
    propertyType: "",
    view: "",
    type: "",
    status: "",
  });

  const handleChange = (value, name) => {
    console.log("name", name, value);
    let copy = { ...selectedOption };
    if (name === "Property Type") {
      copy["propertyType"] = value;
    } else if (name === "View") {
      copy["view"] = value;
    } else if (name === "Type") {
      copy["type"] = value;
    } else {
      copy["status"] = value;
    }
    setSelectedOption(copy);
  };
  const handleResetDropDown = () => {
    setSelectedOption({ propertyType: "", view: "", type: "", status: "" });
  };

  return (
    <React.Fragment>
      <div className="container">
        <Paper sx={{ background: "#002c47" }}>
          <HeaderComp
            handleChange={handleChange}
            handleResetDropDown={handleResetDropDown}
            selectedOption={selectedOption}
          />
        </Paper>
      </div>
      <TableComp selectedOption={selectedOption} />
    </React.Fragment>
  );
};
export default MainComp;
