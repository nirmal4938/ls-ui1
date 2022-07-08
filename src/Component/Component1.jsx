import "./styles.css";
import React, { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = [
  { placeholder: "Property Type", values: ["Residential", "Retail"] },
  {
    placeholder: "View",
    values: [
      "Boulevard",
      "Butterfly Garden",
      "Garden",
      "Leisure Deck",
      "ON Leisure Deck",
      "Park",
      "Park & MG",
      "Park & Mircale",
      "Park View",
    ],
  },
  { placeholder: "Type", values: ["1 Bedroom", "2 Bedroom", "3 Bedroom"] },
  { placeholder: "Status", values: ["Available", "Booked", "Sold Out"] },
];

export const HeaderComp = ({
  handleChange,
  handleResetDropDown,
  selectedOption,
}) => {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = (name) => {
    const options = allOptions?.find((ele) => ele?.placeholder === name);
    return options?.values?.filter((option) =>
      containsText(option, searchText)
    );
  };

  return (
    <div className="container">
      <Grid container spacing={2}>
        {allOptions?.map((ele) => (
          <Grid item xs={12} md={4}>
            <Box>
              <FormControl fullWidth>
                <Select
                  // Disables auto focus on MenuItems and allows TextField to be in focus
                  MenuProps={{ autoFocus: false }}
                  variant="outlined"
                  sx={{ m: 1, background: "white" }}
                  labelId="search-select-label"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  id="search-select"
                  value={
                    selectedOption[
                      ele?.placeholder === "Property Type"
                        ? "propertyType"
                        : ele?.placeholder === "View"
                        ? "view"
                        : ele?.placeholder === "Type"
                        ? "type"
                        : ele?.placeholder === "Status"
                        ? "status"
                        : ""
                    ]
                  }
                  onChange={(e) =>
                    handleChange(e.target.value, ele?.placeholder)
                  }
                  onClose={() => setSearchText("")}
                  // This prevents rendering empty string in Select's value
                  // if search text would exclude currently selected option.
                  renderValue={() =>
                    selectedOption[
                      ele?.placeholder === "Property Type"
                        ? "propertyType"
                        : ele?.placeholder === "View"
                        ? "view"
                        : ele?.placeholder === "Type"
                        ? "type"
                        : ele?.placeholder === "Status"
                        ? "status"
                        : ""
                    ] || ele?.placeholder
                  }
                >
                  {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                  <ListSubheader>
                    <TextField
                      size="small"
                      // Autofocus on textfield
                      autoFocus
                      placeholder="Type to search..."
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          // Prevents autoselecting item while typing (default Select behaviour)
                          e.stopPropagation();
                        }
                      }}
                    />
                  </ListSubheader>
                  {displayedOptions(ele.placeholder).map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Box sx={{ m: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleResetDropDown()}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
