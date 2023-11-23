import * as ex from 'excalibur';
//import { Vector }  from 'excalibur/build/dist/Math/vector';
import { Resources, loader } from './resources';
import { Player } from './player';

// Adiciona o evento para detectar a mudança de orientação retrato/paisagem
window.addEventListener('orientationchange', () => {
    adjustScreenSize();
});

// Função para ajustar o tamanho da tela com base na orientação
function adjustScreenSize() {
    const isPortrait = window.innerHeight > window.innerWidth;
    /*
    if (isPortrait) {
        game.screen.wi = 600;

        game.setResolution({
            width: 600, // Ajuste o valor conforme necessário para a orientação portrait
            height: 800,
            strategy: ex.ResolutionStrategy.NoScale,
        });
    } else {
        game.setResolution({
            width: 800,
            height: 600,
            strategy: ex.ResolutionStrategy.NoScale,
        });
    }
    */
}

const game = new ex.Engine({
    width: 800,
    height: 600,
    canvasElementId: 'game',
    antialiasing: false
});

//adjustScreenSize();

game.start(loader).then(() => {
    const objects = Resources.TiledMap.data.getObjectLayerByName("Objects");
    const camera = objects.getObjectByName("Camera");
    if (camera) {
        game.currentScene.camera.pos = ex.vec(camera.x, camera.y);
        game.currentScene.camera.zoom = camera.getProperty<number>('zoom')?.value ?? 1.0;
    }

    const player = objects.getObjectByName("Player");
    if (player) {
        const playerActor = new Player(ex.vec(player.x, player.y));
        game.currentScene.add(playerActor);
        playerActor.z = 100;
    }
    Resources.TiledMap.addTiledMapToScene(game.currentScene);
});