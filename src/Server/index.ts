//Entry point for Server
import { Engine } from '../Engine/Engine';
import { Time } from '../Engine/systems/Time';
var engine = new Engine();
engine.addSystem(Time);

engine.start();
