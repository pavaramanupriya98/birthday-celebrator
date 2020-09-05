export default class Shape {
    constructor() {
        const canvas = document.querySelector('canvas');
        this.ctx = canvas.getContext('2d');
    }
}