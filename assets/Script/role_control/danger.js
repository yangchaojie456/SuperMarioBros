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

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        role:{
            type: cc.Node,
            default: null
        },
        audioSource_over: {
            type: cc.AudioSource,
            default: null
        },
        audioSource_play: {
            type: cc.AudioSource,
            default: null
        },
    },
    onBeginContact (contact, selfCollider, otherCollider) {
        // let worldManifold = contact.getWorldManifold();
        // this.role.getComponent('role').audioSource.stop();
        
        this.audioSource_over.play();
        this.audioSource_play.stop();
        this.game_over = true;
        // 死亡解绑键盘控制
        var _role = this.role.getComponent('hero')
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, _role.onKeyDown, _role);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, _role.onKeyUp, _role);
    },
    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        this.game_over = false;
        this.firstLoad = true;
    },

    update (dt) {
        
        if (!this.audioSource_over.isPlaying && this.game_over && this.firstLoad){
            cc.director.loadScene("over");
            this.firstLoad = false;
        }        
    },
});
