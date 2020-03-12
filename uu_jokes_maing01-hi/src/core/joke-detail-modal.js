//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Lsi from "../core/jokes-detail-modal-lsi"
//@@viewOff:imports

export const JokeDetailModal = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeDetailModal",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    },
    lsi: Lsi
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
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
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>Component {this.getTagName()}
    <UU5.Bricks.Row  display="flex">
      <UU5.Bricks.Column content={this.getLsiComponent("idLabel")} width="150px"/>
      <UU5.Bricks.Column content={this.props.joke.id} width="Calc(100%-150px)"/>
    </UU5.Bricks.Row>
      <UU5.Bricks.Row  display="flex">
        <UU5.Bricks.Column content={this.getLsiComponent("textLabel")} width="150px"/>
        <UU5.Bricks.Column content={this.props.joke.text} width="Calc(100%-150px)"/>
      </UU5.Bricks.Row>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default JokeDetailModal;
