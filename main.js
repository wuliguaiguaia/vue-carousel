new Vue({
    el: "#app",
    data: {
        number: 3,
        startX: 0,
        disX: 0,
        startY: 0,
        disY: 0,
        isTouch: false,
        name: "toRight",
        curIndex: 0,
        timer:null,
    },
    mounted(){
        let p = document.querySelector(".content div");
        let ele1 = document.querySelectorAll(".content div .item")[this.number-1].cloneNode(true);
        p.insertAdjacentElement("afterbegin",ele1);
        
        let ele2 = document.querySelectorAll(".content div .item")[0].cloneNode(true);
        p.insertAdjacentElement("afterend",ele2);

        this.autoMove();

    },
    watch: {
        isTouch(val){
            if(!val){
                this.autoMove()
            }else{
                clearInterval(this.timer)
            }
        }
    },
    methods: { 
        autoMove(){
            this.timer = setInterval(() => {
                this.gotoLeft();
            }, 3000);
        },
        Tstart(e) {
            this.isTouch = true;
            this.startX = e.changedTouches[0].clientX;
            this.startY = e.changedTouches[0].clientY;
        },
        Tend(e) {
            
            this.disX = e.changedTouches[0].clientX - this.startX;
            this.disY = e.changedTouches[0].clientY - this.startY;
            let isvertical = Math.abs(this.disX) >= Math.abs(this.disY) ? true : false;
            if (this.disX > 0 && isvertical) {
                this.name = 'toRight';
                this.gotoRight();
            } else if (this.disX < 0 && isvertical) {
                this.name = 'toLeft'
                this.gotoLeft();
            } else if(this.disY < 0 && !isvertical){
                this.name = 'toBottom'
                this.gotoLeft();
            }else if(this.disY > 0 && !isvertical){
                this.name = 'toTop'
                this.gotoRight();
            }
            this.isTouch = false;
        },
        gotoRight() {
            this.curIndex--;
            if(this.curIndex === -1){
                this.curIndex = this.number - 1;
            }

        },
        gotoLeft() {
            this.curIndex++;
            if(this.curIndex === this.number ){
                this.curIndex = 0;
            }
        }
    }
})