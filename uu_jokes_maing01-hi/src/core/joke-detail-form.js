//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Context from "./context.js";
import Lsi from "../routes/joke-detail-lsi.js";
//@@viewOff:imports

export const JokeDetailForm = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeDetailForm",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    },
    lsi: Lsi
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    handleUpdate: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  getForm() {
    return this._form;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _onSave(component, values) {
    // component.setPending();
    typeof this.props.handleUpdate === "function" && this.props.handleUpdate(values);
    return this;
  },

  _onCancel(component) {
    alert("Cancel pressed");
    return this;
  },

  _prepareCommonProps(componentName, joke, feedbacks, messages, onChange, onChangeFeedback) {
    return {
      name: componentName,
      value: joke[componentName],
      feedback: feedbacks[componentName],
      message: messages[componentName],
      label: this.getLsiComponent(componentName + "Label"),
      onChange: onChange,
      onChangeFeedback: onChangeFeedback
    };
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <Context.Consumer>
        {({ joke, feedbacks, messages, onChange, onChangeFeedback }) => {
          let commonParams = [joke, feedbacks, messages, onChange, onChangeFeedback];
          return (
            <UU5.Bricks.Div {...this.getMainPropsToPass()}>
              <UU5.Common.Fragment>
                <UU5.Bricks.Div className="uu5-common-right">
                  <UU5.Bricks.LanguageSelector displayedLanguages={["en", "uk"]} />
                </UU5.Bricks.Div>
                <UU5.Forms.Form
                  ref_={form => (this._form = form)}
                  labelColWidth="xs-12 s-12 m-3 l-2 xl-2"
                  inputColWidth="xs-12 s-12 m-8 l-9 xl-9"
                  spacing={8}
                  onSave={({ component, values }) => this._onSave(component, values)}
                  onCancel={({ component }) => this._onCancel(component)}
                >
                  <UU5.Forms.Text
                    {...this._prepareCommonProps("name", ...commonParams)}
                    required={true}
                    placeholder={this.getLsiValue("namePlaceholder")}
                    size="s"
                  />
                  <UU5.Forms.TextArea
                    {...this._prepareCommonProps("text", ...commonParams)}
                    placeholder={this.getLsiValue("textPlaceholder")}
                    spacing={16}
                    size="s"
                  />
                  <UU5.Forms.Controls />
                </UU5.Forms.Form>
              </UU5.Common.Fragment>
            </UU5.Bricks.Div>
          );
        }}
      </Context.Consumer>
    );
  }
  //@@viewOff:render
});

export default JokeDetailForm;
