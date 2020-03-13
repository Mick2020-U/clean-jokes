//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import ContextProvider from "../core/context-provider";
import JokeDetailForm from "../core/joke-detail-form";
import Calls from "../calls";
//@@viewOff:imports

export const JokeUpdate = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeUpdate",
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
  _onSave({component, values}, handleUpdate) {
    // component.setPending();
    typeof handleUpdate === "function" && handleUpdate(values);

  },
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
    return (
      <UU5.Common.DataManager onUpdate={this._onUpdate} pessimistic>
        {({ viewState, handleUpdate, data }) => {
          return (
            <UU5.Bricks.Div {...this.getMainPropsToPass()}>
                <JokeDetailForm ref_={component => (this._jokeDetailForm = component)}
                                handleUpdate={handleUpdate}
                                onSave={(opt) => this._onSave(opt, handleUpdate)}
                                onCancel={({ component }) => this._onCancel(component)}
                />
            </UU5.Bricks.Div>
          );
        }}
      </UU5.Common.DataManager>
    );
  }
  //@@viewOff:render
});

export default JokeUpdate;
