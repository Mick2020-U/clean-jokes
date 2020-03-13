//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import JokeDetailModal from "./joke-detail-modal";
//@@viewOff:imports

export const Joke = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Joke",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.object
    // name: UU5.PropTypes.object,
    //  category: UU5.PropTypes.array,
    //  text: UU5.PropTypes.string,
    //  image: UU5.PropTypes.object
  },
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
  // _getChildren(){
  //   if(this.props.text) {
  //     return <UU5.Bricks.Text content={this.props.joke.text}/>
  //   }
  // },
  //@@viewOff:private
  _openJokeDetail() {
   // UU5.Environment.setRoute("jokeDetail", {id: this.props.joke.id});
   UU5.Environment.getPage().getModal().open({
     header: "joke",
     content: <JokeDetailModal joke={this.props.joke}/>
   });
  },
  //@@viewOn:render

  render() {
    console.log(this.props, "this.props");
    return <UU5.Bricks.Column {...this.getMainPropsToPass()} colWidth="xs-12 s-6 m-6 l-4 xl-3">
      {/*<UU5.Bricks.Card
        header={<UU5.Bricks.Text content={this.props.joke.name} classname={"uu5-common-singleline-ellipsis"}/>}
        footer={<UU5.Bricks.Button content="open Detail" onClick={this._openJokeDetail}/>}
        level={6}
        bgStyle="outline"
        className={"uu5-common-padding-s"}>
        {this.props.joke.text && <UU5.Bricks.Text content={this.props.joke.text}/>}
        {this.props.joke.image &&
        <UU5.Bricks.Text content={this.props.joke.image}
               tooltip={this.props.joke.image}
              level={6} classname={"uu5-common-singleline-ellipsis"}/>}
      </UU5.Bricks.Card>*/}
    </UU5.Bricks.Column>;
  },
  //@@viewOff:render

});

export default Joke;
