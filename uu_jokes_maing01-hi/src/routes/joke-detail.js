//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import JokeDetailForm from "../core/joke-detail-form";
import ContextProvider from "../core/context-provider.js";
//@@viewOff:imports

export const JokeDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeDetail",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
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
  _onUpdate(newData) {
    return new Promise((resolve, reject) => {
      Calls.createJoke({
        data: newData,
        done: dtoOut => {
          this._jokeDetailForm.getForm().setReady();
          UU5.Environment.getPage()
            .getAlertBus()
            .setAlert({
              content: "Joke created successfully!",
              colorSchema: "success"
            });
          resolve(dtoOut);
        },
        fail: dtoOut => {
          this._jokeDetailForm.getForm().setReady();
          UU5.Environment.getPage()
            .getAlertBus()
            .setAlert({
              content: "Joke was not created!",
              colorSchema: "danger"
            });
          reject(dtoOut);
        }
      });
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    UU5.Common.Tools.setLanguage("uk");
    return (
      <UU5.Common.DataManager onUpdate={this._onUpdate} pessimistic>
        {({ viewState, handleUpdate }) => {
          return (
            <UU5.Bricks.Div {...this.getMainPropsToPass()}>
              <ContextProvider>
                <JokeDetailForm ref_={component => (this._jokeDetailForm = component)} handleUpdate={handleUpdate} />
              </ContextProvider>
            </UU5.Bricks.Div>
          );
        }}
      </UU5.Common.DataManager>
    );
  }
  //@@viewOff:render
});

export default JokeDetail;
