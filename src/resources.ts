import { ImageFiltering, ImageSource, Loadable, Loader } from "excalibur";
import { TiledMapResource } from '@excaliburjs/plugin-tiled';

import { Sound } from 'excalibur';


export const Resources = {
    // Sprites
    HeroSpriteSheetPng: new ImageSource('./img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png', false, ImageFiltering.Pixel),
    // Maps
    TiledMap: new TiledMapResource('./res/first-level.tmx'),
    
    // Audios
    NPCSpeech1: new Sound('./audio/npc_speech_1.mp3'),
    NPCSpeech2: new Sound('./audio/npc_speech_2.mp3'),
    // Adicione mais conforme necessário
}

// Change the path to be relative to the root directory for the webpack prod build
const convertPath = Resources.TiledMap.convertPath;
Resources.TiledMap.convertPath = (originPath: string, relativePath: string) => {
    if (relativePath.indexOf('../') > -1) {
        return './' + relativePath.split('../')[1];
    }
    return convertPath(originPath, relativePath);
}


export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}