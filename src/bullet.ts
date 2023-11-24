// bullet.ts
import * as ex from 'excalibur';

export class Bullet extends ex.Actor {
    private initialSpeed: number;
    private minSpeed: number = 10;

    constructor(pos: ex.Vector, dir: ex.Vector, initialSpeed: number) {
        super({
            pos,
            width: 5,
            height: 5,
            color: ex.Color.Red,
            collisionType: ex.CollisionType.Active
        });

        this.vel = dir.normalize().scale(initialSpeed);
        this.initialSpeed = initialSpeed;
    }

    onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
        // Reduzir gradualmente a velocidade até um mínimo
        this.vel = this.vel.scale(0.95);
        if (this.vel.magnitude() < this.minSpeed) {
            this.vel = ex.Vector.Zero;
            // a pedra deve ficar parada no cenário até que o Player a pegue
            //this.kill(); // Remover a pedra quando a velocidade for mínima
        }
    }
}