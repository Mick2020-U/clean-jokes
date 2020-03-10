//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const Content = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Content",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    semaforStatus: UU5.PropTypes.oneOf(["red", "redOrange", "green", "orange"])
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      semaforStatus: this.props.semaforStatus || "green"
    };
  },
  componentWillReceiveProps(nextProps){
    console.log(nextProps, "Will receive props");
  },
  componentDidMount(){
    console.log(new Date(),"didMount");
    setInterval(()=> {
      this.props.clickFunc();
    },3000)
  },
  componentDidUpdate(prevProps, nextProps) {
    console.log(prevProps === nextProps);
  },
  componentWillUnmount(){
    console.log("WillUnmount");
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _handleButtonClick(opions) {
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
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.Badge content="0" colorSchema={this.props.semaforStatus === "red" || this.props.semaforStatus === "redOrange" ? "red" : "gray"}/>
      <UU5.Bricks.Badge content="0" colorSchema={this.props.semaforStatus === "orange" || this.props.semaforStatus === "redOrange" ? "orange" : "gray"}/>
      <UU5.Bricks.Badge content="0" colorSchema={this.props.semaforStatus === "green" ? "green" : "gray"}/>

    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default Content;
