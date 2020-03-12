//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Context from "./context";
//@@viewOff:imports

export const ContextProvider = UU5.Common.Component.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "ContextProvider",
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      joke: {},
      onChange: this._onChange
    }
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _onChange (opt) {
    console.log(opt, "================================opt");
    // do something
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <Context.Provider value = {this.state}>{this.props.children} </Context.Provider>
  }
  //@@viewOff:render
});

export default ContextProvider;
