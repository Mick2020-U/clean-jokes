//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Context from "./context.js";
//@@viewOff:imports

export const ContextProvider = UU5.Common.Component.create({

//@@viewOn:mixins

  mixins: [UU5.Common.BaseMixin],

//@@viewOff:mixins

  //@@viewOn:statics

  statics: {

    tagName: Config.TAG + "ContextProvider"

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

      feedbacks: {},

      messages: {},

      onChange: this._onChange,

      onChangeFeedback: this._onChangeFeedback

    };

  },

//@@viewOff:reactLifeCycle

  //@@viewOn:interface

//@@viewOff:interface

  //@@viewOn:overriding

//@@viewOff:overriding

  //@@viewOn:private

  _onChange(opt) {

    // do something when we are ready

    let componentName = opt.component.getName();

    this.setState(

      prevState => {

        let newJoke = UU5.Common.Tools.mergeDeep({}, prevState.joke);

        newJoke[componentName] = opt.value;

        return {

          joke: newJoke

        };

      },

      () => opt.component.onChangeDefault(opt)

    );

  },

  _onChangeFeedback(opt) {

    let componentName = opt.component.getName();

    this.setState(prevState => {

      let newJoke = UU5.Common.Tools.mergeDeep({}, prevState.joke);

      let newFeedbacks = UU5.Common.Tools.mergeDeep({}, prevState.feedbacks);

      let newMessages = UU5.Common.Tools.mergeDeep({}, prevState.messages);

      newJoke[componentName] = opt.value;

      newFeedbacks[componentName] = opt.feedback;

      newMessages[componentName] = opt.message;

      return {

        joke: newJoke,

        feedbacks: newFeedbacks,

        messages: newMessages

      };

    });

  },

//@@viewOff:private

  //@@viewOn:render

  render() {

    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;

  }

//@@viewOff:render
});

export default ContextProvider;
