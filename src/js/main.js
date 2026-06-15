import { fetchJsonData } from "./utils.mjs";

const tcgdexUrl = 'https://api.tcgdex.net/v2/en/cards';

const pokemonTCGData = await fetchJsonData(tcgdexUrl);
console.log(pokemonTCGData);