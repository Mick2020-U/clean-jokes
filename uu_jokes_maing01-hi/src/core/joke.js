//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import JokeDetailModal from "./joke-detail-modal";
//@@viewOff:imports
import "./joke.less"
export const Joke = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Joke",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`,
      cardStyle: Config.Css.css`height: 100%;`
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
    UU5.Environment.setRoute("jokeUpdate", {id:this.props.id})
    /*UU5.Environment.getPage().getModal()
      .open({
        header: <UU5.Bricks.Text content ={this.props.name} className={"uu5-common-singleline-ellipsis"}/> ,
        content: <JokeDetailModal joke = {this.props} content="fake content"/>
      })*/
  },
  //@@viewOn:render

  render() {
    const { name, text } = this.props;
    return (
      <UU5.Bricks.Card
        header={<UU5.Bricks.Text content={name} classname={"uu5-common-singleline-ellipsis"}/>}
        footer={<UU5.Bricks.Button content="open Detail" onClick={this._openJokeDetail}/>}
        level={6}
        bgStyle="outline"
        className={"uu5-common-padding-s joke"}
      >
        {text && <UU5.Bricks.Text content={text}/>}
        {/*{this.props.joke.image &&*/}
        {/*<UU5.Bricks.Text content={this.props.joke.image}*/}
        {/*       tooltip={this.props.joke.image}*/}
        {/*      level={6} classname={"uu5-common-singleline-ellipsis"}/>*/}

      </UU5.Bricks.Card>)

  },
  //@@viewOff:render

});

export default Joke;
