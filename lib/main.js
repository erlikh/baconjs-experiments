import R from "ramda"
import {drawApple, drawHero} from "./draw"
import {vectors, sumVectors} from "./vectors"
import inputStream from "./input"
import apple from "./apple"


let directionsStream = inputStream
  .map(keyName => vectors.get(keyName))
  .filter(R.identity);

let pos = directionsStream.scan(vectors.get("zero"), sumVectors);
pos.onValue(drawHero);

let appl = apple(pos);
appl.onValue(drawApple);
