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
  _handleOnSave({ component, values }, handleUpdate) {
    component.setPending();
    console.log("handelUpdate");
    handleUpdate({...values, id:this.props.params.id});
  },

  _handleOnCancel({ component, values }) {
    console.log("Cancel function");
  },

  _onUpdate(newData) {
    console.log("newData", newData);
    return new Promise((resolve, reject) => {
      Calls.updateJoke({
        data: newData,
        done: dtoOut => {
          console.log('this._jokeForm', this._jokeForm);
          this._jokeForm.getForm().setReady();
          UU5.Environment.getPage().getAlertBus().setAlert({
            content: "joke created successfully",
            colorSchema: "success"
          });
          resolve(dtoOut)
        },
        fail: dtoOut => {
          this._jokeForm.getForm().setReady();
          UU5.Environment.getPage().getAlertBus().setAlert({
            content: "joke creation failed",
            colorSchema: "danger"
          });
          reject(dtoOut);
        }
      })
    });
  },

  _onLoad(dtoIn) {
    return new Promise((resolve, reject) => {
      Calls.getOneJoke({
        data: dtoIn,
        done: dtoOut => resolve(dtoOut),
        fail: response => reject(response)
      });
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Common.DataManager
        onUpdate={this._onUpdate}
        onLoad={this._onLoad}
        data={{ id: this.props.params.id }}
        pessimistic
      >
        { ({ viewState, handleUpdate, data }) => {
          console.log("", viewState);
          return (
            <JokeDetailForm
              ref_={component => (this._jokeForm = component)}
              onSave={(opt) => {this._handleOnSave(opt, handleUpdate)}}
              onCancel={(opt) => {this._handleOnCancel(opt)}}
              initValue={data}
            />
          )
        } }
      </UU5.Common.DataManager>
    );
  }
  //@@viewOff:render
});

export default JokeUpdate;
