//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Lsi from "../routes/joke-detail-lsi.js";
import Context from "./context";
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <Context.Consumer>
        {({ joke, onChange }) => {
          return (
            <UU5.Bricks.Div {...this.getMainPropsToPass()}>
              <UU5.Common.Fragment>
                <UU5.Bricks.Div className="uu5-common-right">
                  <UU5.Bricks.LanguageSelector displayedLanguages={["en", "uk"]}/>
                </UU5.Bricks.Div>
                <UU5.Forms.Form
                  values={joke}
                  ref_={form => (this._form = form)}
                  labelColWidth="xs-12 s-12 m-3 l-2 xl-2"
                  inputColWidth="xs-12 s-12 m-8 l-9 xl-9"
                  spacing={8}
                  onSave={({ component, values }) => this._onSave(component, values)}
                  onCancel={({ component }) => this._onCancel(component)}
                >
                  <UU5.Forms.Text
                    value="name"
                    name="name"
                    required={true}
                    label={this.getLsiComponent("nameLabel")}
                    placeholder={this.getLsiValue("namePlaceholder")}
                    size="s"
                    onChange={onChange}
                  />
                  <UU5.Forms.Select
                    value="city"
                    name="city"
                    label="Issue category"
                    size="s"
                    multiple={true}
                    openToContent={true}
                  >
                    <UU5.Forms.Select.Option value="prg" content="Prague"/>
                    <UU5.Forms.Select.Option value="ps" content="Písek"/>
                    <UU5.Forms.Select.Option value="cb" content="České Budějovice"/>
                  </UU5.Forms.Select>
                  <UU5.Forms.TextArea
                    value="text"
                    name="text"
                    label={this.getLsiComponent("textLabel")}
                    placeholder={this.getLsiValue("textPlaceholder")}
                    spacing={16}
                    size="s"
                  />
                  <UU5.Forms.Number
                    value="number1"
                    name="number1"
                    label="Number 1"
                    size="s"
                    buttonHidden={true}
                    valueType="number"
                    controlled={false}
                  />
                  <UU5.Forms.Number
                    value="number2"
                    name="number2"
                    label="Number 2"
                    size="s"
                    buttonHidden={true}
                    valueType="number"
                    controlled={false}
                  />
                  <UU5.Forms.Number
                    value="result"
                    name="result"
                    label="Result"
                    size="s"
                    buttonHidden={true}
                    valueType="number"
                    controlled={false}
                  />
                  <UU5.Forms.DateTimePicker
                    value="date"
                    valueType="date"
                    name="dateOfBirth"
                    label="Date"
                    seconds={true}
                    size="s"
                    controlled={false}
                  />
                  <UU5.Forms.Controls/>
                </UU5.Forms.Form>
              </UU5.Common.Fragment>
            </UU5.Bricks.Div>
          )
        }
        }
      </Context.Consumer>

    );
  }
  //@@viewOff:render
});

export default JokeDetailForm;
