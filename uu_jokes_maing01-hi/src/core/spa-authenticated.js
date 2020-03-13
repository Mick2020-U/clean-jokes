import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import * as Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import Left from "./left.js";
import Bottom from "./bottom.js";
import About from "../routes/about.js";
import Home from "../routes/home.js";
import Content from "./content";
import Jokes from "../routes/jokes";
import JokeDetail from "../routes/joke-detail";
import JokeCreate from "../routes/joke-create";
import JokeUpdate from "../routes/joke-update";
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
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <Plus4U5.App.Page
        {...this.getMainPropsToPass()}
        top={<Plus4U5.App.Top content={this.getLsiComponent("name")} />}
        bottom={<Bottom />}
        type={2}
        displayedLanguages={["cs", "en"]}
        left={<Left identity={this.props.identity} />}
        leftWidth="!xs-320px !s-320px !m-256px l-256px xl-256px"
        modal={<UU5.Bricks.Modal/>}>
        {/*alertBus={<UU5.Bricks.AlertBus/>}*/}
        <UU5.Common.Router
          routes={{
            "": "jokes",
            jokes: { component: <Jokes identity={this.props.identity} /> },
            jokeDetail: {component: <JokeDetail identity={this.props.identity} />},
            jokeCreate: {component: <JokeCreate identity={this.props.identity} />},
            jokeUpdate: {component: <JokeUpdate identity={this.props.identity} />},
            /*"joke/list" : {component: <Jokes identity={this.props.identity} />},*/
            about: { component: <About identity={this.props.identity} /> },
          }}
          controlled={false}
          notFoundRoute={<Content/>}
        />
      </Plus4U5.App.Page>
    );
  }
  //@@viewOff:render
});

export default SpaAuthenticated;
