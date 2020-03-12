//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import JokeDetailLsi from "./joke-detail-lsi"
//@@viewOff:imports

export const JokeDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Forms.TextInputMixin, UU5.Common.PureRenderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeDetail",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }, lsi: JokeDetailLsi
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
  _onSave(component, values) {
    alert('Saving component (values are in console)');
    console.log('Values:', values);
    return this;
  },

  _onCancel(component) {
    alert('Cancel pressed');
    return this;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    UU5.Common.Tools.getBrowserLanguage("uk");
    let initialValues = {
      name: "init",
      text: "init",
      number: 123,
      city: ["Kyiv"],
      dateOfBirth: "3.12.1975"
    };
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.ScreenSize>

        <UU5.Bricks.LanguageSelector displayedLanguages={["en", "uk"]}/>
        <UU5.Forms.Form
          labelColWidth="xs-12 s-12 m-3 l-2 xl-2"
          inputColWidth="xs-12 s-12 m-8 l-9 xl-9" spacing={2}

          onSave={({ component, values }) => this._onSave(component, values)}
          onCancel={({ component }) => this._onCancel(component)}>

          <UU5.Forms.Text
            name={"name"}
            required={true}
            label={this.getLsiComponent("nameLabel")}
            placeholder={this.getLsiValue("namePlaceholder")}
            value={initialValues.name}
            size="s"
          />

          <UU5.Forms.TextArea
            name={"text"}
            label={this.getLsiComponent("nameText")}
            placeholder={this.getLsiValue("nameTextPlaceholder")}
            value={initialValues.text}
            message="error message"
            size="s"
          />
          <UU5.Forms.Number
            name={"number"}
            inputColWidth="xs-12 s-12 m-8 l-9 xl-9"
            label="Number of items"
            feedback="error"
            message="error message"
            value={initialValues.number}
            size="s"
            min={0}
            max={10000000}
            step={1}
            buttonHidden={true}
          />
          <UU5.Forms.DatePicker
            name={"date"}
            label="Date of birth"
            placeholder="1/1/1990"
            size="s"
            value={initialValues.dateOfBirth}
          />
          <UU5.Forms.Select
            value={initialValues.city}
            name={"select"}
            label="Issue category"
            size="s"
            multiple={true}
          >
            <UU5.Forms.Select.Option value="Pr" content="Prague"/>
            <UU5.Forms.Select.Option value="Kyiv"/>
            <UU5.Forms.Select.Option value="Lviv"/>
          </UU5.Forms.Select>
          <UU5.Forms.Controls/>
        </UU5.Forms.Form>
      </UU5.Bricks.ScreenSize>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default JokeDetail;
