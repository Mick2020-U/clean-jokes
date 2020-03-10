//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import * as Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import Left from "./left.js";
import Top from "./top.js";
import Content from "./content.js";
import Bottom from "./bottom.js";
import About from "../routes/about.js";
import Home from "../routes/home.js";
//@@viewOff:imports

const SpaAuthenticated = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "SpaAuthenticated",
    classNames: {
      main: ""
    },
    lsi: {
      name: Lsi.appName
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    identity: UU5.PropTypes.shape()
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      identity: null
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      semaforStatus: "green"
    }
  },

  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _handleButtonClick() {
    this.setState(prevState => {
      let newState = {};
      if (prevState.semaforStatus === "green") {
        newState.semaforStatus = "orange";
      } else if (prevState.semaforStatus === "orange") {
        newState.semaforStatus = "red";
      } else if (prevState.semaforStatus === "red") {
        newState.semaforStatus = "redOrange"
      } else if (prevState.semaforStatus === "redOrange") {
        newState.semaforStatus = "green"
      }
      return newState;
    })
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <Plus4U5.App.Page
        {...this.getMainPropsToPass()}
        top={<Top appName="Unciorn Jokes"/>}
        bottom={<Bottom/>}
        type={2}
        displayedLanguages={["cs", "en", "uk"]}
        left={<Left identity={this.props.identity}/>}
        leftWidth="!xs-320px !s-320px !m-256px l-256px xl-256px"
      >
        <UU5.Common.Fragment>
          <Content identity={this.props.identity} semaforStatus={this.state.semaforStatus}/>
          <UU5.Bricks.Button content="Change Semafor" onClick={this._handleButtonClick}/>
        </UU5.Common.Fragment>
        <UU5.Common.Router

          routes={{
            "": "home",
            home: {
              component: ""
            },
            about: { component: <About identity={this.props.identity}/> }
          }}
          controlled={false}
        />
      </Plus4U5.App.Page>
    );
  }
  //@@viewOff:render
});

export default SpaAuthenticated;
