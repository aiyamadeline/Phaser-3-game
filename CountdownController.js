export default class CountdownController


{


    /** @type {Phaser.Time.timerEvent}*/
    
    timerEvent
   

    /**
     * 
     * @Param {Phaser.Scene} scene
     * @Param {Phaser.GameObject.Text} label
     * 
     */

    


    constructor(scene, label){
        
        this.scene = scene
        this.label = label
    }

    //Param {() => void} callback
    //Param {number} duration

    start(callback, duration = 45000){
      
        //stop in case one is already running
        this.stop()

        this.duration = duration

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.label.text = '0'

                this.stop()

                if (callback){
                    callback()
                }
              }
        })
    }
   
    stop(){
        
        if(this.timerEvent){
            this.timerEvent.destroy()
            this.timerEvent = undifined
        }

    }

    update(){

        if(!this.timerEvent || this.duration <= 0){
            return
        }
        const elapsed = this.timerEvent.getElapsed()

        const remaining = this.duration - elapsed

        const seconds = remaining / 1000

        this.label.text = seconds.toFixed(2)
    } 
}
