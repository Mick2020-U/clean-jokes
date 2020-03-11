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
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    semaphorStatus: UU5.PropTypes.oneOf(["red", "redOrange", "orange", "green"]),
    onButtonClick: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    console.log("getInitialState: ", new Date());
    let semaphorStatus;
    if (["red", "redOrange", "orange", "green"].includes(this.props.semaphorStatus)) {
      semaphorStatus = this.props.semaphorStatus;
    } else {
      semaphorStatus = "green";
    }
    return {
      semaphorStatus: semaphorStatus
    };
  },

  componentDidMount() {
    console.log("didMount: ", new Date());
    setInterval(() => this._hangleButtonClick(), 2000);
  },

  componentWillReceiveProps(nextProps) {
    console.log("will receive props", nextProps);
    this.setState({ semaphorStatus: this.props.semaphorStatus });
  },

  componentDidUpdate(prevState, prevProps) {
    console.log("didUpdate: ", new Date());
  },

  componentWillUnmount() {
    console.log("willUnmount: ", new Date());
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _hangleButtonClick(options) {
    this.setState(prevState => {
      let newState = {};
      if (prevState.semaphorStatus === "green") {
        newState.semaphorStatus = "orange";
      } else if (prevState.semaphorStatus === "orange") {
        newState.semaphorStatus = "red";
      } else if (prevState.semaphorStatus === "red") {
        newState.semaphorStatus = "redOrange";
      } else if (prevState.semaphorStatus === "redOrange") {
        newState.semaphorStatus = "green";
      }
      return newState;
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Column {...this.getMainPropsToPass()} width="200px">
        <UU5.Bricks.Card header="City Lights" className="uu5-common-padding-s" elevation={1}>
          <UU5.Bricks.Jumbotron
            content=" "
            borderRadius={36}
            colorSchema={
              this.state.semaphorStatus === "red" || this.state.semaphorStatus === "redOrange" ? "red-rich" : "red"
            }
          />
          <UU5.Bricks.Jumbotron
            content=" "
            borderRadius={36}
            colorSchema={
              this.state.semaphorStatus === "orange" || this.state.semaphorStatus === "redOrange"
                ? "orange-rich"
                : "orange"
            }
          />
          <UU5.Bricks.Jumbotron
            content=" "
            borderRadius={36}
            colorSchema={this.state.semaphorStatus === "green" ? "green-rich" : "green"}
          />
        </UU5.Bricks.Card>
        <UU5.Bricks.ScreenSize>
          <UU5.Bricks.ScreenSize.Item screenSize="xs">
            <UU5.Bricks.Span content="Content for XS" />
          </UU5.Bricks.ScreenSize.Item>
          <UU5.Bricks.ScreenSize.Item screenSize="s">
            <UU5.Bricks.Span content="Content for S" />
          </UU5.Bricks.ScreenSize.Item>
          <UU5.Bricks.ScreenSize.Item screenSize={["m", "l", "xl"]}>
            <UU5.Bricks.Span content="Content for M-XL" />
          </UU5.Bricks.ScreenSize.Item>
        </UU5.Bricks.ScreenSize>
      </UU5.Bricks.Column>
    );
  }
  //@@viewOff:render
});

export default Content;
