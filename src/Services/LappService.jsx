import { Component } from "react";
const axios = require("axios");

class LappServices extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // this.name= props.name.bind(this)
  }

  async savePdf(data) {
    const lappURL = process.env.REACT_APP_SAVE_PDF_URL;
    const xAPIKey = process.env.REACT_APP_PDF_X_API_KEY;
    const result = await axios({
      method: "post",
      url: `${lappURL}&xapikey=${xAPIKey}`,
      data: data,
    });
    const { statusCode, message } = result?.data;
    console.log("myResponse", statusCode, message, result);
    if(statusCode === 200) {
        axios({
            method: "get",
            url: message,
            mode: "no-cors",
            xhrFields: {
              responseType: "blob",
            },
          })
          .then((response) => {
            console.log('url', response?.data);
            browser.downloads.download({url: response?.data}) 
            // var a = document.createElement("a");
            // var url = window.URL.createObjectURL(response?.data);
            // a.href = url;
            // a.download = "myfile.pdf";
            // document.body.append(a);
            // a.click();
            // a.remove();
            // window.URL.revokeObjectURL(url);
          }).catch((err) => console.log('Error: ', err))
       
    }
    else {
        return message?.message;
    }
  }
}

export default LappServices;
