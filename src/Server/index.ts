//Entry point for Server
import { Engine } from '../Engine/Engine';
import { Time } from '../Engine/systems/Time';
import { ServerNetworking } from '../Server/systems/ServerNetworking';
var engine = new Engine();
engine.framerate = 20;
engine.addSystem(Time);
engine.addSystem(ServerNetworking);

engine.start();
