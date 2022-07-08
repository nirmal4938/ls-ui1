import { Component } from "react";
import LappServices from "../Services/LappService.jsx";
class LappController extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // this.name= props.name.bind(this)
  }

  async savePdf(data) {
    const services = new LappServices();
    await services.savePdf(data);
  }
}

export default LappController;
