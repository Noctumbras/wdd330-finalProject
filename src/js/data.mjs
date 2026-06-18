import { getSettings } from "./localStorage.mjs";

const tcgdexDataUrl = 'https://api.tcgdex.net/v2/en/cards';
const yugiohDataUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

function cardTemplate(imageUrl, altText) {
    return `<img 
                src="${imageUrl}"
                alt="${altText}"
                width="397"
                height="586"
            />
            <p class="card-price"></p>
            `;
}

export async function getPokemonCard(htmlElement) {
    const gameSettings = getSettings();
    let searchString = '?image=notnull:';

    // Monsters only
    if (gameSettings[2] == 'true') {
        searchString += '&category=Pokemon';
    }

    const cardData = await fetchJsonData(tcgdexDataUrl + searchString);
    const dataLength = cardData.length;
    const randomNumber = Math.floor(Math.random() * dataLength);

    const singleCardUrl = tcgdexDataUrl + `/${cardData[randomNumber].id}`;
    const singleCardData = await fetchJsonData(singleCardUrl);
    console.log(singleCardData);

    const imageUrl = `${singleCardData.image}/high.webp`;
    const altText = `${singleCardData.name} from ${singleCardData.set.name}`;

    let price = 0.01;
    if (singleCardData.pricing.tcgplayer)
    {
        if (singleCardData.pricing.tcgplayer.normal)
            price = singleCardData.pricing.tcgplayer.normal.marketPrice;
        else if (singleCardData.pricing.tcgplayer.holofoil)
            price = singleCardData.pricing.tcgplayer.holofoil.marketPrice;
    }   

    htmlElement.innerHTML = cardTemplate(imageUrl, altText);
    return price;
}

export async function getYugiohCard(htmlElement) {
    const gameSettings = getSettings();
    let searchString = '';

    // Monsters only
    if (gameSettings[2] == 'true') {
        searchString += '?atk=gte0';
    }

    const cardData = await fetchJsonData(yugiohDataUrl + searchString);
    const dataLength = cardData.data.length;
    const randomNumber = Math.floor(Math.random() * dataLength);
    //console.log(cardData.data);

    const singleCardData = cardData.data[randomNumber];
    console.log(singleCardData);

    const imageUrl = singleCardData.card_images[0].image_url;

    let altText = 'singleCardData.name';

    if (singleCardData.card_sets)
        altText += ` from ${singleCardData.card_sets[0].set_name}`;

    let price = singleCardData.card_prices[0].tcgplayer_price;


    htmlElement.innerHTML = cardTemplate(imageUrl, altText);
    return price;
}

export async function fetchJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
