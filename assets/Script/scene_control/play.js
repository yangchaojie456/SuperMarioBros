// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function () {
        // var clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "play";//这个是代码文件名
        // clickEventHandler.handler = "callback";
        // clickEventHandler.customEventData = "play";

        // var button = this.node.getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);
    },
    start(){

    },
    callback: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        // var node = event.target;
        // var button = node.getComponent(cc.Button);
        
        cc.director.loadScene("game");
        
        //这里的 customEventData 参数就等于你之前设置的 "play"
    }
});
