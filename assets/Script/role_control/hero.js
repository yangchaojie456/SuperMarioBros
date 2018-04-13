// game art from : https://openpixelproject.itch.io/opp2017sprites

const MOVE_LEFT = 1;
const MOVE_RIGHT = 2;

cc.macro.ENABLE_TILEDMAP_CULLING = false;

cc.Class({
    extends: cc.Component,

    properties: {
        maxSpeed: 300,
        acceleration: 1500,
        drag: 600,
        jumps: 2,
        jumpSpeed: 1100,

        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },
    
    play: function () {
        
        this.audioSource.play();
        this.audioSource.loop= true;
        this.audioSource.volume = 0.1
    },
    start(){
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        this.play();
    },
    // use this for initialization
    onLoad: function () {
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this._moveFlags = 0;

        this._up = false;

        this.body = this.getComponent(cc.RigidBody);
        this.anim = this.getComponent(cc.Animation);

        // 检测按键长按和双击
        this.holdTimeEclipse = 0;//用来检测长按
        this.hold = false;
        // 双击时间间隔
        this.doublehold = 0
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags |= MOVE_LEFT;
                this.hold = true;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags |= MOVE_RIGHT;
                this.hold = true;
                break;
            case cc.KEY.up:

                if (!this._upPressed) {
                    this._up = true;
                }
                this._upPressed = true;
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.hold = false;
                this._moveFlags &= ~MOVE_LEFT;
                this.anim.play('smallRoleLeftStand');
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.hold = false;
                this._moveFlags &= ~MOVE_RIGHT;
                this.anim.play('smallRoleRightStand');
                break;
            case cc.KEY.up:
                this._upPressed = false;
                break;
        }
    },



    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        // 检测双击和长按
        if (this.hold) {
            this.holdTimeEclipse++
        } else {
            this.holdTimeEclipse = 0
            this.maxSpeed = 300
        }
        // 长按时间大于 大概3s 最大速度提示
        if (this.holdTimeEclipse > 100) {
            this.maxSpeed = 800
        }else{
            this.maxSpeed = 300
        }


        var speed = this.body.linearVelocity;

        if (this._moveFlags === MOVE_LEFT) {
            let animState = this.anim.getAnimationState('smallRoleLeft')
            if (!animState.isPlaying) {
                animState.speed = 2.5;
                this.anim.play('smallRoleLeft');
            }

            // if (this.node.scaleX > 0) {
            //     this.node.scaleX *= -1;
            // }

            speed.x -= this.acceleration * dt;
            if (speed.x < -this.maxSpeed) {
                speed.x = -this.maxSpeed;
            }
        }
        else if (this._moveFlags === MOVE_RIGHT) {

            let animState = this.anim.getAnimationState('smallRoleRight')
            if (!animState.isPlaying) {
                animState.speed = 2.5;
                this.anim.play('smallRoleRight');
            }

            // if (this.node.scaleX < 0) {
            //     this.node.scaleX *= -1;
            // }

            speed.x += this.acceleration * dt;
            if (speed.x > this.maxSpeed) {
                speed.x = this.maxSpeed;
            }
        }
        else {
            if (speed.x != 0) {
                var d = this.drag * dt;
                if (Math.abs(speed.x) <= d) {
                    speed.x = 0;
                    // this.anim.play('idle');
                } else {
                    speed.x -= speed.x > 0 ? d : -d;
                }
            }
        }
        
        if (Math.abs(speed.y) < 1) {
            this.jumps = 1;
        }else{
            this.jumps = 0;
        }

        if (this.jumps > 0 && this._up) {

            // if (!this.anim.getAnimationState('smallRoleRight').isPlaying) {
            //     this.anim.play('smallRoleRight');
            // }
            speed.y = this.jumpSpeed;
            this.jumps--;
        }
        
        this._up = false;
        this.body.linearVelocity = speed;
    },
    // 角色降旗
    // 先变换动画 然后下降
    lowerFlag(position){
        
        
        
    }
});
