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
        flag:{
            type:cc.Node,
            default:null
        },
        role:{
            type:cc.Node,
            default:null
        },
        audioSource_end: {
            type: cc.AudioSource,
            default: null
        },
        audioSource_play: {
            type: cc.AudioSource,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onBeginContact (contact, selfCollider, otherCollider) {
        // 碰到旗子，游戏过关
        // 切换音乐
        // 音乐结束完换场景
        this.audioSource_end.play();
        this.audioSource_play.stop();
        
        
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = false;
        // 死亡解绑键盘控制
        let _role = this.role.getComponent('hero')
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, _role.onKeyDown, _role);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, _role.onKeyUp, _role);
        
        // 人物下降
        _role._moveFlags = 0
        _role.anim.play('dropFlag');

        let roleCurrentPos = this.role.convertToWorldSpaceAR(cc.Vec2.ZERO)

        let staffPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO)
        let rolePos = this.role.convertToNodeSpaceAR(cc.v2(staffPos.x-30, staffPos.y-this.node.height/2))

        
        var roleDropFlag = cc.moveBy(1, rolePos).easing(cc.easeCubicActionIn());        
        this.role.runAction(cc.sequence(cc.moveTo(0,this.role.parent.convertToNodeSpaceAR(cc.v2(roleCurrentPos.x+55,roleCurrentPos.y))),roleDropFlag));
        // 旗子下降
        this.flag.runAction(cc.moveBy(3,cc.v2(0,-this.node.height/2+50)))

        this.node.getComponent("flag_staff").scheduleOnce(function() {
            // 这里的 this 指向 component
            this.game_end = true;
        }, 4);
    },
    start () {
        this.game_end = false;
        // 跳转场景只跳一次
        this.firstLoad = true
    },

    update (dt) {
        

        if (!this.audioSource_end.isPlaying && this.game_end && this.firstLoad){
            cc.director.loadScene("end");
            this.firstLoad = false;
        }       
    },
});
