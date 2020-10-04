import distance from "../utils/distance";
import getMouseCoords from "../utils/mouseCoords";

export default class Shape {
    constructor(draggable = false) {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.draggable = draggable;
        this.isBeingDragged = false;
    }

    updateMouseInteractionStatus() {
        const { mouseX, mouseY, clickX, clickY, isDragging } = getMouseCoords();

        if (this.hasCollidedWithPoint(clickX, clickY) && isDragging) {
            this.isBeingDragged = true;
            this.canvas.style.cursor = 'grabbing';
        } else if (!isDragging) {
            this.isBeingDragged = false;
        }

        if (this.hasCollidedWithPoint(mouseX, mouseY) && !isDragging) {
            this.canvas.style.cursor = 'grab';
        } else if (!isDragging) {
            this.canvas.style.cursor = 'auto';
        }
    }

    hitBoxOptions () {
        return null;
    }

    hasCollidedWithPoint(pointX, pointY) {
        // HitBox Info
        const hitBoxOptions = this.hitBoxOptions();

        if(hitBoxOptions === null) return false;

        switch(hitBoxOptions.type) {
            case 'rectangle': {
                const {
                    left, top, width, height,
                } = hitBoxOptions;

                if(
                    pointX >= left  &&
                    pointX <= left + width &&
                    pointY >= top &&
                    pointY <= top + height
                  ) {
                    return true;
                  } else {
                    return false;
                  }
            }

            case 'circle': {
                const {
                    x, y, radius
                } = hitBoxOptions;

                return distance({ x, y }, { x: pointX, y: pointY }) <= radius;
            }

            default: {
                return false;
            }
        }
    }

}