import * as ex from 'excalibur';
import { Resources } from './resources';
import { Player } from './player';
import { Config } from './config';

export class NPC extends ex.Actor {
    private hasInteracted: boolean = false;
    
    private dialogueIndex: number = 0;
    private dialogueTimer: ex.Timer;
    private dialogues: string[] = [
        "Olá, viajante!",
        "Bem-vindo à cidade!",
        "Espero que tenha uma jornada agradável."
        // Adicione mais frases conforme necessário
    ];

    constructor(pos: ex.Vector, private dialogue: string) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Passive // Não colide ativamente com o jogador
        });
        
        // Configurar o temporizador para alternar as frases a cada 5 segundos
        //this.dialogueTimer = new ex.Timer(() => {
            //this.speakNextDialogue();
        //});
        //, 5000, true);
        //this.dialogueTimer.interval = 5000;
        //this.dialogueTimer.repeats = true;
    }
    
    private speakNextDialogue(): void {
        // Exibir a próxima frase e reiniciar o temporizador
        console.log(`NPC diz: ${this.dialogues[this.dialogueIndex]}`);

        // Atualizar o índice para a próxima frase
        this.dialogueIndex = (this.dialogueIndex + 1) % this.dialogues.length;
    }

    onInitialize(engine: ex.Engine): void {
        // Configurar sprites ou animações para o NPC se necessário
        const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.HeroSpriteSheetPng as ex.ImageSource,
            grid: {
                spriteWidth: 16,
                spriteHeight: 16,
                rows: 8,
                columns: 8
            }
        });
        
        const leftIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('left-idle', leftIdle);

        const rightIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('right-idle', rightIdle);


        const upIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('up-idle', upIdle);

        const downIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('down-idle', downIdle);

        const leftWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('left-walk', leftWalk);

        const rightWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('right-walk', rightWalk);

        const upWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('up-walk', upWalk);

        const downWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('down-walk', downWalk);
    }

    onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
        const player = engine.currentScene.actors.find(actor => actor instanceof Player) as Player;

        // Verificar a proximidade do jogador
        const distanceToPlayer = this.pos.distance(player.pos);

        // Se o jogador estiver próximo e ainda não interagiu com o NPC
        if (distanceToPlayer < 30 && !this.hasInteracted) {
            // Exibir mensagem (substitua por sua lógica de exibição de mensagem)
            console.log(`NPC diz: ${this.dialogue}`);
            
            // Marcar que o NPC interagiu para evitar interações repetidas
            this.hasInteracted = true;
        }
    }
}
