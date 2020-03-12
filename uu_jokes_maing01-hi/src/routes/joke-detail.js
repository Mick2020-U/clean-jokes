//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Lsi from "./joke-detail-lsi"
import Calls from "../calls";
//@@viewOff:imports

export const JokeDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.LsiMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeDetail",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    },
    lsi: Lsi
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
  _onSave(component, values, handleUpdate) {
    component.setPending();
    console.log('Values:', values);
    handleUpdate(values);
  },
  _onCancel(component) {
    alert('Cancel pressed');
    return this;
  },
  _onUpdate(newData) {
    return new Promise((resolve, reject) => {
      Calls.createJoke({
        data: newData,
        done: (dtoOut)=> {
          this.form.setReady();
          UU5.Environment.getPage().getAlertBus().setAlert({
            content: "Joke created successfullly",
            colorSchema: "success"
          });
          resolve(dtoOut);
        },
        fail: reject
      })
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    UU5.Common.Tools.setLanguage("uk");

    let initialValues = {
      name: "my joke",
      text: "not funny joke",
      number: "4",
      town: ["Kharkiv"],
      date: "1.1.2020"
    };
//@@viewOff:imports
    return (
      <UU5.Common.DataManager onUpdate={this._onUpdate} pessimistic>
        {({ viewState, handleUpdate }) => {
          return (
            <UU5.Bricks.Div {...this.getMainPropsToPass()}>

              <UU5.Bricks.ScreenSize>
                {({ screenSize }) => {
                  let spacing;

                  switch (screenSize) {
                    case "xl":
                    case "l":
                    case "m":
                      spacing = 8;
                      break;
                    case "s":
                      spacing = 4;
                      break;
                    case "xs":
                      spacing = 2;
                      break;
                  }
                  return (
                    <UU5.Common.Fragment>
                      <UU5.Bricks.LanguageSelector displayedLanguages={["en", "uk"]}/>

                      <UU5.Forms.Form
                        ref_={form => (this.form = form)}
                        labelColWidth={"xs-12 s-12 m-3 l-2 xl-2"}
                        inputColWidth={"xs-12 s-12 m-8 l-9 xl-9"}
                        spacing={8}
                        onSave={({ component, values }) => this._onSave(component, values, handleUpdate)}
                        // onCancel={({coponent})=> this._onCancel(component)}
                      >
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
                          label={this.getLsiComponent("textLabel")}
                          placeholder={this.getLsiValue("textPlaceholder")}
                          value={initialValues.text}
                          size="s"
                        />
                        <UU5.Forms.Number
                          name={"number"}
                          inputColWidth={"xs-12 s-12 m-2 l-1 xl-1"}
                          label="Number"
                          value={initialValues.number}
                          valueType={"number"}
                          size="s"
                          buttonHidden={true}
                          min={0}
                          max={5}
                          step={1}
                        />
                        <UU5.Forms.DatePicker
                          name={"date"}
                          label="Date"
                          placeholder="1/1/1990"
                          size="m"
                          value={initialValues.date}
                          required
                        />
                        <UU5.Forms.Select
                          name={"town"}
                          label="Town"
                          size="s"
                          multiple={true}
                          value={initialValues.town}
                        >
                          <UU5.Forms.Select.Option value="Kyiv"/>
                          <UU5.Forms.Select.Option value="Lviv"/>
                          <UU5.Forms.Select.Option value="Kharkiv"/>
                        </UU5.Forms.Select>
                        <UU5.Forms.Controls/>
                      </UU5.Forms.Form>
                    </UU5.Common.Fragment>
                  )
                }}
              </UU5.Bricks.ScreenSize>
            </UU5.Bricks.Div>
          )
        }}

      </UU5.Common.DataManager>
    );
  }
  //@@viewOff:render
});

export default JokeDetail;
