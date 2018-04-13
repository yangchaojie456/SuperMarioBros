cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node
        },
        map: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.camera = this.getComponent(cc.Camera);
    },

    onEnable: function () {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function () {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    // called every frame, uncomment this function to activate update callback
    lateUpdate: function (dt) {
        // console.log(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO))
        let heroPos = this.hero.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let nodePos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        
        var x = heroPos.x
        if (heroPos.x < this.node.width / 2 / this.camera.zoomRatio) {
            x = this.node.width / 2 / this.camera.zoomRatio
        } else if (heroPos.x > this.map.width - this.node.width / 2 / this.camera.zoomRatio) {
            x = this.map.width - this.node.width / 2 / this.camera.zoomRatio
        }
        this.node.position = this.node.parent.convertToNodeSpaceAR(cc.v2(x, nodePos.y));

        // let ratio = heroPos.y / cc.winSize.height;
        // this.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    },
});