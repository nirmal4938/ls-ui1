import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import { useMemo } from "react";
import Moment from "moment";
import html2pdf from "html2pdf-fix-jspdf";
import "./styles.css";
import LappController from "../Controllers/lappController.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const html = require("./index.html");

const axios = require("axios");

export const TableComp = ({ selectedOption }) => {
  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FF0000",
          },
        },
      },
    });

  const columns = [
    {
      name: "propertyType",
      label: "Property Type",
      color: "red",
      options: {
        filter: true,
        sort: true,
        marginLeft: "30px",
        color: "red",
        style: { background: "red" },
      },
    },
    {
      name: "unitNo",
      label: "Unit No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "view",
      label: "View",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "totalArea",
      label: "Total Area",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "unitPrice",
      label: "Unit Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "plan",
      label: "Plan",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "salesOffer",
      label: "Sales Offer",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const lappURL = process.env.REACT_APP_LAPP_URL;
  const xAPIKey = process.env.REACT_APP_X_API_KEY;

  console.log("htmllllllllllllll", html);
  let settings = useMemo(() => {
    return {
      url: lappURL + "&action=searchLead",
      timeout: 0,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": xAPIKey,
      },
      data: JSON.stringify({
        mx_Property_Type: selectedOption?.propertyType,
        mx_View: selectedOption?.view,
        mx_TYPE: selectedOption?.type,
        mx_Status: selectedOption?.status,
      }),
      json: true,
    };
  }, [selectedOption]);

  const [tableData, setTableData] = useState([]);

  const options = {
    filterType: "dropdown",
    resizableColumns: true,
    responsive: "stacked",
    print: false,
  };
  const unitPriceArary = ["Diram", "USD", "EURO", "POUND", "INR"];
  console.log(process.env);

  const formatData = (array) => {
    const formated = array?.map((item) => {
      if (item["mx_Status"] === "Booked") {
        return {
          propertyType: item["mx_Property_Type"],
          unitNo: item["mx_Unit_No"],
          view: item["mx_View"],
          type: item["mx_TYPE"],
          totalArea: item["mx_Total_Area"],
          unitPrice: getDropDown(item["mx_Unit_Price"], unitPriceArary),
          plan: getTableButton("View Plan", item["ProspectID"]),
          salesOffer: getTableButton("Generate Sales Offer",  item["ProspectID"]),
          status: getTableButton("Cancel",  item["ProspectID"]),
        };
      } else if (item["mx_Status"] === "Available") {
        return {
          propertyType: item["mx_Property_Type"],
          unitNo: item["mx_Unit_No"],
          view: item["mx_View"],
          type: item["mx_TYPE"],
          totalArea: item["mx_Total_Area"],
          unitPrice: getDropDown(item["mx_Unit_Price"], unitPriceArary),
          plan: getTableButton("View Plan",  item["ProspectID"]),
          salesOffer: getTableButton("Generate Sales Offer",  item["ProspectID"]),
          status: getTableButton("Book",  item["ProspectID"]),
        };
      } else {
        return {
          propertyType: item["mx_Property_Type"],
          unitNo: item["mx_Unit_No"],
          view: item["mx_View"],
          type: item["mx_TYPE"],
          totalArea: item["mx_Total_Area"],
          unitPrice: getDropDown(item["mx_Unit_Price"], unitPriceArary),
          plan: getTableButton("View Plan",  item["ProspectID"]),
          salesOffer: getTableButton("Generate Sales Offer",  item["ProspectID"]),
          status: getTableButton("Sold Out",  item["ProspectID"]),
        };
      }
    });
    return formated;
  };

  const getTableButton = (text, id) => {
    return (
      <div>
        <Button
          variant="outlined"
          size="small"
          disabled={text === "Sold Out"}
          onClick={() => handleOnClick(text, id)}
        >
          {text}
        </Button>
      </div>
    );
  };
  const random = (minimum, maximum) => {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
  };
  const template = `

        <table class="table table-bordered mt-4 mb-4">
            <thead>
                <tr>
                    <th scope=" col" class="text-center text-capitalize">
                        project
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        total area(Sqft)
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        actual price(AED)
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        discount applied(%)
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        selling price(AED)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">Benessere</td>
                    <td class="text-center">575.01</td>
                    <td class="text-center">AED 760434.00</td>
                    <td class="text-center">0</td>
                    <td class="text-center">AED 760434.00</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th scope=" col" class="text-center text-capitalize">
                        category
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        unit number
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        payment plan type
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        view
                    </th>
                    <th scope="col" class="text-center text-capitalize">
                        bedrooms
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">Residential</td>
                    <td class="text-center">B124</td>
                    <td class="text-center text-uppercase">RG</td>
                    <td class="text-center">On Leisure Deck</td>
                    <td class="text-center">1 Bedroom</td>
                </tr>
            </tbody>
        </table>
        `;

  const generatePdf = (id) => {
    const controller = new LappController();
    controller.savePdf({
      "id": id,
    });

    // using lapp api to get pdf

    // setPdfLoading(true);
    // eslint-disable-next-line import/no-webpack-loader-syntax
    // var __html = require('html-loader?name=[name].[ext]!./pdf.html');
    // console.log('sksk', ele);
    // var template = { __html: __html };
    // const date = Moment().format("MMMM Do YYYY, h:mm:ss a");
    // const opt = {
    //   margin: [0.4, 0.2, 0.8, 0.2],
    //   enableLinks: false,
    //   pagebreak: { mode: "avoid-all" },
    //   image: { type: "jpg", quality: 1, useCORS: true },
    //   html2canvas: { scale: 2, dpi: 400, letterRendering: true, useCORS: true },
    //   jsPDF: {
    //     unit: "in",
    //     format: "a4",
    //     orientation: "portrait",
    //     useCORS: true,
    //   },
    // };
    // const referenceNo = `${random(10000, 99999)}`;
    // const userName = "Pragmaapps";

    // html2pdf()
    //   .from(template)
    //   .set(opt)
    //   .toPdf()
    //   .get("pdf")
    //   .then((pdf) => {
    //     console.log("pdf:", pdf);
    //     const totalPages = pdf.internal.getNumberOfPages();
    //     for (let i = 1; i <= totalPages; i++) {
    //       pdf.setPage(i);
    //       pdf.setFontSize(8);
    //       pdf.setTextColor(100);
    //       pdf.text(
    //         `Reference No: ${referenceNo}`,
    //         0.3,
    //         pdf.internal.pageSize.getHeight() - 0.44
    //       );
    //       pdf.text(
    //         `Generated By: ${userName}`,
    //         0.3,
    //         pdf.internal.pageSize.getHeight() - 0.32
    //       );
    //       pdf.text(
    //         `Issued on: ${date}`,
    //         0.3,
    //         pdf.internal.pageSize.getHeight() - 0.2
    //       );
    //       pdf.text(
    //         `Page ${i} of ${totalPages}`,
    //         pdf.internal.pageSize.getWidth() - 1,
    //         pdf.internal.pageSize.getHeight() - 0.2
    //       );
    //     }
    //     // setPdfLoading(false);
    //     let userAgent = navigator.userAgent;
    //     if (userAgent.match(/firefox|fxios/i)) {
    //       window.open(pdf.output("bloburl"), "_blank");
    //     } else {
    //       pdf.save(`${"Benessere"} ${"B124"}`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("pdf err:", err);
    //   });
  };

  const handleOnClick = (value, id) => {
    if (value === "Generate Sales Offer") {
      generatePdf(id);
    }
  };
  const getDropDown = (item, array) => {
    return (
      <div className="form-group">
        <select className="form-control-md" style={{ width: "70%" }}>
          {array?.map((ele, index) => (
            <option key={index}>{ele}</option>
          ))}
        </select>
        <br />
        <p>{item}</p>
      </div>
    );
  };
  useEffect(() => {
    const getTableData = async () => {
      const response = await axios(settings);
      console.log(response);
      try {
        if (response?.data?.statusCode === 200) {
          const updatedData = formatData(response?.data?.message);
          setTableData(updatedData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTableData(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [settings]);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={""}
            data={tableData}
            columns={columns}
            options={options}
            print={false}
          />
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
