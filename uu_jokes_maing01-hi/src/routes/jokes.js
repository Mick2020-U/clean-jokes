//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "../config/config.js";
import Calls from "../calls";
import Lsi from "./jokes-lsi";
import Joke from "../core/joke";
//@@viewOff:imports

export const Jokes = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Jokes",
    classNames: {
      main: (props, state) => Config.Css.css`background: ${UU5.Environment.colors.lime.c200}; padding: 8px; margin: 8px 0;`
    },
    lsi: Lsi
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  componentDidMount() {
    UU5.Environment.getRouter().preventPageLeave();
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getJokes(jokeList) {
    return jokeList.map(joke => {
      return <Joke joke={joke} key={joke.id}/>
    })
  },
  _showAlert() {
    UU5.Environment.getPage().getAlertBus().setAlert({
      content: "Bus is arriving",
      colorSchema: "warning"
    })
  },
  _openContextMenu(button, event) {
    this._menu.open({ event });
  },
  _openCreateJokeRoute() {
    UU5.Environment.setRoute("jokeDetail")
  },
  _allowPageLeave(){
    UU5.Environment.getRouter().allowPageLeave();
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.ContextMenu ref_={(menu) => this._menu = menu} header='Header' footer='Footer'>
        <UU5.Bricks.ContextMenu.Item
          label="Submenu"
          space
        >
          <UU5.Bricks.ContextMenu.Item
            label="Submenu Item"
            space
          />
          <UU5.Bricks.ContextMenu.Item
            label="Submenu Item"
            space
          />
        </UU5.Bricks.ContextMenu.Item>
        <UU5.Bricks.ContextMenu.Item
          label="Submenu"
          space
        >
          <UU5.Bricks.ContextMenu.Item
            label="Submenu Item"
            space
          />
          <UU5.Bricks.ContextMenu.Item
            label="Submenu Item"
            space
          />
        </UU5.Bricks.ContextMenu.Item>
      </UU5.Bricks.ContextMenu>
      <UU5.Common.Loader onLoad={Calls.jokeList} data={{ sortBy: "name" }}>
        {({ isLoading, isError, data }) => {
          if (isLoading) {
            return <UU5.Bricks.Loading/>;
          } else if (isError) {
            return <UU5.Bricks.Error errorData={data}/>;
          } else {
            return (
              <UU5.Common.Fragment>
                <UU5.Bricks.Header
                  content={("jokesListHeader")}
                  tooltip={this.getLsiValue("jokesListHeader")}
                  level={3}/>
                <UU5.Bricks.LanguageSelector displayedLanguages={["en", "uk"]}/>
                <UU5.Bricks.Button colorSchema="green"
                                   onClick={this._openCreateJokeRoute}
                >
                  <UU5.Bricks.Icon icon="mdi-plus-circle"/> Create Joke
                </UU5.Bricks.Button>
                <UU5.Bricks.Row display="flex">
                  {data && data.data && this._getJokes(
                    data.data.itemList
                  )}
                </UU5.Bricks.Row>
              </UU5.Common.Fragment>
            )
          }
        }}
      </UU5.Common.Loader>
     {/*<UU5.Bricks.Div content="<uu5string/> <Plus4U5.UuForum.Chat code='cd315701d4a6348cab5c69d964d198006364dfe7aa25d4c02947e10647f4cd7e' expanded/>" />*/}
    </UU5.Bricks.Div>;
  },
  //@@viewOff:render
});

export default Jokes;
