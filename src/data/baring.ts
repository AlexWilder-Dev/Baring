// Everything the site says about The Baring lives here.
// Menus are transcribed from the PDFs on thebaring.co.uk (filenames and dates below).
// Dish names and prices are as printed. Nothing added.

export type MenuItem = { name: string; price?: string; note?: string }
export type MenuGroup = { heading?: string; items: MenuItem[] }

export type PrintedMenu = {
  id: 'a-la-carte' | 'sunday'
  title: string
  printed: string // date on the PDF filename
  pdf: string
  groups: MenuGroup[]
  notes: string[]
}

const site = 'https://www.thebaring.co.uk'

export const contact = {
  name: 'The Baring',
  street: '55 Baring Street',
  town: 'London',
  postcode: 'N1 3DS',
  phone: '020 7916 5861',
  phoneHref: 'tel:+442079165861',
  email: 'enquiries@thebaring.co.uk',
  instagram: '@thebaring',
  instagramUrl: 'https://www.instagram.com/thebaring/',
  booking: 'https://www.sevenrooms.com/explore/thebaring/reservations/create/search/',
  vouchers: 'https://thebaring.giftpro.co.uk/vouchers/the-baring-gift-voucher/',
  website: site,
  maps: 'https://www.google.com/maps/search/?api=1&query=The+Baring%2C+55+Baring+Street%2C+London+N1+3DS',
}

// Opening and food times. Minutes from midnight, London time. Day 0 = Sunday (JS convention).
export type Window = { from: number; to: number }
export type Day = {
  name: string
  short: string
  open?: Window
  food: (Window & { label: string })[]
}

const t = (h: number, m = 0) => h * 60 + m

export const week: Day[] = [
  {
    name: 'Sunday',
    short: 'Sun',
    open: { from: t(12), to: t(18) },
    food: [{ from: t(12), to: t(16), label: 'Roasts' }],
  },
  { name: 'Monday', short: 'Mon', food: [] },
  {
    name: 'Tuesday',
    short: 'Tue',
    open: { from: t(12), to: t(23) },
    food: [
      { from: t(12), to: t(14, 30), label: 'Lunch' },
      { from: t(18), to: t(21, 30), label: 'Dinner' },
    ],
  },
  {
    name: 'Wednesday',
    short: 'Wed',
    open: { from: t(12), to: t(23) },
    food: [
      { from: t(12), to: t(14, 30), label: 'Lunch' },
      { from: t(18), to: t(21, 30), label: 'Dinner' },
    ],
  },
  {
    name: 'Thursday',
    short: 'Thu',
    open: { from: t(12), to: t(23) },
    food: [
      { from: t(12), to: t(14, 30), label: 'Lunch' },
      { from: t(18), to: t(21, 30), label: 'Dinner' },
    ],
  },
  {
    name: 'Friday',
    short: 'Fri',
    open: { from: t(12), to: t(23) },
    food: [
      { from: t(12), to: t(14, 30), label: 'Lunch' },
      { from: t(18), to: t(21, 30), label: 'Dinner' },
    ],
  },
  {
    name: 'Saturday',
    short: 'Sat',
    open: { from: t(12), to: t(23) },
    food: [
      { from: t(12), to: t(15, 30), label: 'Lunch' },
      { from: t(18), to: t(21, 30), label: 'Dinner' },
    ],
  },
]

// As the current site prints them.
export const hoursText = [
  { days: 'Monday', open: 'Closed', food: '' },
  { days: 'Tuesday – Friday', open: '12:00 – 23:00', food: 'Food 12.00 – 14.30 / 18.00 – 21.30' },
  { days: 'Saturday', open: '12:00 – 23:00', food: 'Food 12.00 – 15.30 / 18.00 – 21.30' },
  { days: 'Sunday', open: '12:00 – 18:00', food: 'Food 12.00 – 16.00' },
]

const allergens = 'Please speak to a member of staff for allergen information prior to ordering'

// Menu-101026-dinner.pdf
export const aLaCarte: PrintedMenu = {
  id: 'a-la-carte',
  title: 'À la carte',
  printed: '10 October 2026',
  pdf: `${site}/s/Menu-101026-dinner.pdf`,
  groups: [
    {
      items: [
        { name: 'House spritz', price: '13' },
        { name: 'Paloma', price: '13' },
        { name: 'Chartreuse sour', price: '13' },
        { name: 'Franck Peillot Bugey Montagneu Brut 125ml', price: '11' },
        { name: 'Blurred vines ‘Spark’ alcohol free 125ml', price: '7' },
      ],
    },
    {
      items: [
        { name: 'Bread & butter', price: '3' },
        { name: 'Gordal olives', price: '4' },
        { name: 'House nuts', price: '4' },
        { name: 'Salsiccia Sarda al mirto', price: '10' },
      ],
    },
    {
      items: [
        { name: 'Grilled friggitellis, ajo blanco, nectarine & smoked almonds', price: '13' },
        { name: 'Cime di rapa, stracciatella & Cantabrian anchovy on toast', price: '15' },
        { name: 'Sea bream crudo, yuzu ponzu & Miyagawa satsumas', price: '14' },
        { name: 'Quail shish, garlic yoghurt & pul biber chilli', price: '14' },
        { name: 'Braised sweetcorn, Scottish girolles & pancetta', price: '14' },
      ],
    },
    {
      items: [
        { name: 'Delica pumpkin tortiglioni, scamorza & pearl onions', price: '25' },
        { name: 'Cornish skate, potato rosti, taramasalata & sauce Grenobloise', price: '29' },
        { name: 'Middle White pork loin, pepperonata, Taggiasca olives & oregano', price: '28' },
        { name: 'Wild mallard, puy lentils, smoked beetroot & sauerkraut', price: '28' },
        { name: 'Grilled Highland sirloin of beef for two, chips & hispi cabbage', price: '78' },
      ],
    },
    {
      items: [
        { name: 'Grilled hispi cabbage', price: '6' },
        { name: 'Bitter leaf salad', price: '6' },
        { name: 'Chips & garlic mayonnaise', price: '6' },
      ],
    },
    {
      items: [
        { name: 'Black sesame soft serve & crab apple compote', price: '9' },
        { name: 'Crème caramel & English blackberries', price: '10' },
        { name: 'Ragstone, quince jelly & sourdough crackers', price: '12' },
      ],
    },
    {
      items: [
        { name: 'Château Dauphiné-Rondillon Loupiac Cuvée D’or 2011 100ml', price: '14' },
        { name: 'Domaine la Luminaille Rasteau 2022 100ml', price: '13' },
        { name: 'Chateau de Léberon Colombard vin Muté 50ml', price: '8' },
        { name: 'Nuvo Nivo London Eau de Vie 35ml', price: '10' },
        { name: 'Quinta do Infantado 10 Years Tawny Port 75ml', price: '11' },
      ],
    },
  ],
  notes: [allergens, 'Game may contain shot'],
}

// Sunday-111026.pdf
export const sunday: PrintedMenu = {
  id: 'sunday',
  title: 'Sunday',
  printed: '11 October 2026',
  pdf: `${site}/s/Sunday-111026.pdf`,
  groups: [
    {
      items: [
        { name: 'Pul biber bloody mary', price: '13' },
        { name: 'Paloma', price: '13' },
        { name: 'Chartreuse sour', price: '13' },
        { name: 'Franck Peillot Bugey Montagneu Brut 125ml', price: '11' },
        { name: 'Blurred Vines ‘Spark’ alcohol free 125ml', price: '7' },
      ],
    },
    {
      items: [
        { name: 'Bread & butter', price: '3' },
        { name: 'Gordal olives', price: '4' },
        { name: 'House nuts', price: '4' },
        { name: 'Salsiccia Sarda al mirto', price: '10' },
      ],
    },
    {
      items: [
        { name: 'Grilled friggitellis, ajo blanco, nectarine & smoked almonds', price: '13' },
        { name: 'Cime di rapa, stracciatella & Cantabrian anchovy on toast', price: '15' },
        { name: 'Sea bream crudo, yuzu ponzu & Miyagawa satsumas', price: '14' },
        { name: 'Quail shish, garlic yoghurt & pul biber chilli', price: '14' },
        { name: 'Braised sweetcorn, Scottish girolles & pancetta', price: '14' },
      ],
    },
    {
      items: [
        { name: 'Delica pumpkin tortiglioni, scamorza & pearl onions', price: '25' },
        { name: 'Cornish skate, potato rosti, taramasalata & sauce Grenobloise', price: '29' },
      ],
    },
    {
      heading: 'Roasts served with roast potatoes, hispi cabbage & gravy:',
      items: [
        { name: 'Dry aged Highland beef rump, Yorkshire pudding & horseradish', price: '29' },
        { name: 'Black Prestige chicken, cavolo nero & bread sauce', price: '27' },
        { name: 'Swaledale pork shoulder, piattoni beans & apple ketchup', price: '28' },
        { name: 'Highland sirloin of beef for two, Yorkshire pudding & horseradish', price: '78' },
      ],
    },
    {
      items: [
        { name: 'Chips', price: '6' },
        { name: 'Bitter leaf salad', price: '6' },
      ],
    },
    {
      items: [
        { name: 'Black sesame soft serve & crab apple compote', price: '9' },
        { name: 'Crème caramel & English blackberries', price: '10' },
        { name: 'Ragstone, quince jelly & sourdough crackers', price: '12' },
      ],
    },
    {
      items: [
        { name: 'Château Dauphiné-roudillon Cuvée D’or Loupiac 2011 100ml', price: '14' },
        { name: 'Domaine la Luminaille Rasteau 2022 100ml', price: '13' },
        { name: 'Chateau de Léberon Colombard vin Muté 50ml', price: '8' },
        { name: 'Bepi Tosolini Myrtil Liqueur 35ml', price: '7' },
        { name: 'Nuvo Nivo London Eau de Vie 35ml', price: '10' },
      ],
    },
  ],
  notes: [allergens],
}

// wine-Drinks-list-081026.pdf
export type Wine = { name: string; glass?: string; carafe?: string; bottle: string; chilled?: boolean }
export type WineSection = { id: string; title: string; columns: ('125ml' | '500ml' | 'Btl')[]; wines: Wine[] }

export const wineList = {
  printed: '8 October 2026',
  pdf: `${site}/s/wine-Drinks-list-081026.pdf`,
  cellarNote: 'Please ask to see our cellar list of single bottles from rare & iconic producers',
  sections: [
    {
      id: 'sparkling',
      title: 'Sparkling',
      columns: ['125ml', 'Btl'],
      wines: [
        {
          name: 'Entre Vinyes Funambul Cava Brut Nature, Penedes, Spain 2021 (Xarel-lo, Macabeo, Parellada)',
          bottle: '46',
        },
        { name: 'Folias de Baco, Pet Nat Rosé, Douro, Portugal 2024 (Pinot Noir)', bottle: '59' },
        {
          name: 'Franck Peillot, Bugey Montagneu Brut, Savoie, France NV (Mondeuse, Altesse, Chardonnay)',
          glass: '11',
          bottle: '63',
        },
        {
          name: 'Bertrand-Delespierre L’enfant de la Montagne 1er Cru, Champagne, France NV (Pinot Noir, Chardonnay, Pinot Meunier)',
          bottle: '99',
        },
      ],
    },
    {
      id: 'white',
      title: 'White',
      columns: ['125ml', '500ml', 'Btl'],
      wines: [
        {
          name: 'Bergerie de la Bastide Blanc, Languedoc, France 2024 (Sauvignon Blanc, Grenache Blanc)',
          bottle: '32',
        },
        {
          name: 'Convento da Vila Branco, Alentejo, Portugal 2025 (Roupeiro, Rabo de Ovelha, Ferão Pires)',
          glass: '5.7',
          carafe: '23',
          bottle: '34',
        },
        { name: 'Ca’di Rajo, Terre di Rai, Veneto, Italy 2024 (Pinot Grigio)', bottle: '38' },
        {
          name: 'Jané Ventura, Vinyes Blanques, Penedes, Spain 2025 (Xarel-lo, Macabeo, Garnacha Blanca, Malvasia)',
          glass: '7',
          carafe: '28',
          bottle: '39',
        },
        { name: 'Cantina Miglianico, Trebbiano d’Abruzzo, Abruzzo, Italy 2025 (Trebbiano)', bottle: '42' },
        { name: 'Walgate Wines, ‘W Blanc’, Kent, England 2023 (Auxerrois, Ortega)', bottle: '43' },
        { name: 'Staffelter Hof, Magnus, Mosel, Germany 2024 (Riesling)', glass: '8', carafe: '32', bottle: '47' },
        {
          name: 'Moschopolis Winery, Aiora White, Thessaloniki, Greece 2024 (Assyrtiko, Malagousia, Xinomavro)',
          bottle: '48',
        },
        { name: 'Domino del Carabo, Carabo Blanco, Rioja Alavesa, Spain 2023 (Viura)', bottle: '51' },
        {
          name: 'Domaine Mabillot, Reuilly Blanc, Loire Valley, France 2024 (Sauvignon Blanc)',
          glass: '9.5',
          carafe: '38',
          bottle: '55',
        },
        { name: 'Nibiru, Schönberg Gruner Veltliner, Kamptal, Austria 2024 (Gruner Veltliner)', bottle: '59' },
        { name: 'Domaine Léon Boesch, Le Coq, Alsace, France 2024 (Pinot Gris)', bottle: '60' },
        { name: 'Casa de Mouraz, Encruzado, Dão, Portugal 2022 (Encruzado)', bottle: '64' },
        {
          name: 'Juanjo Tellaetxe, Tantaka, Arabako-Txakolina, Spain 2023 (Hondarribi Zuri)',
          glass: '12',
          carafe: '48',
          bottle: '68',
        },
        { name: 'Domaine Garnier Et Fils, Chablis, Burgundy, France 2024 (Chardonnay)', bottle: '78' },
        {
          name: 'Domaine Tremblay, ‘Montmain’ Chablis 1er Cru, Burgundy, France 2023 (Chardonnay)',
          glass: '14',
          carafe: '56',
          bottle: '83',
        },
        { name: 'Domaine Coursodon, Saint Joseph Silice Blanc, Rhône Valley, France 2024 (Marsanne)', bottle: '99' },
        {
          name: 'Domaine Picard, Saint Aubin 1er Cru ‘Le Charmois’ Blanc, Burgundy, France 2022 (Chardonnay)',
          bottle: '141',
        },
        {
          name: 'Domaine Coffinet-Duvernay, ‘Les Blanchots Dessous’, Chassagne-Montrachet, Burgundy, France 2023 (Chardonnay)',
          bottle: '189',
        },
      ],
    },
    {
      id: 'red',
      title: 'Red',
      columns: ['125ml', '500ml', 'Btl'],
      wines: [
        { name: 'Botter Estate, Callesella, Puglia, Italy 2024 (Negroamaro)', bottle: '32' },
        { name: 'Antica Enotria, Nellamiatera Rosso, Foggia, Italy 2024 (Nero di Troia)', bottle: '35' },
        {
          name: 'Bodegas Pittacum, Petit Pittacum, Bierzo, León, Spain 2024 (Mencia)',
          glass: '6.5',
          carafe: '26',
          bottle: '37',
        },
        { name: 'Christoph Muret, ‘Syrah’, Languedoc, France 2024 (Syrah)', bottle: '39' },
        {
          name: 'Château du Barrailh, Le Grave Singalier, Bordeaux, France 2023 (Merlot, Cabernet Sauvignon)',
          glass: '7.5',
          carafe: '30',
          bottle: '43',
        },
        { name: 'Cascina Zerbetta, Origine, Piedmont, Italy 2022 (Barbera)', bottle: '46' },
        {
          name: 'Élodie Jaume, Coudoulet Rouge, Côtes du Rhône, France 2024 (Grenache, Syrah, Mourvèdre)',
          bottle: '49',
        },
        { name: 'DIT Celler, Selenita Negre, Catalonia, Spain 2022 (Garnacha)', bottle: '50' },
        {
          name: 'La Cuverie Gloussard, ‘Plouplou’, Revermont Bugey, France 2022 (Poulsard)',
          bottle: '54',
          chilled: true,
        },
        { name: 'Domaine Jeanne Germain, ‘Bavardages’, Samur-Champigny, France 2023 (Cabernet Franc)', bottle: '56' },
        {
          name: 'Jean-Michel Dupré ‘Chai d’Oeuvre’ Morgon, Beaujolais, France 2023 (Gamay)',
          glass: '10',
          carafe: '40',
          bottle: '57',
          chilled: true,
        },
        { name: 'Bodega Akutain, Rioja Crianza, Rioja Alta, Spain 2021 (Tempranillo, Garnacha, Viura)', bottle: '61' },
        { name: 'Thörle, Spätburgunder, Rheinhessen, Germany 2023 (Pinot Noir)', bottle: '63' },
        {
          name: 'La Palazzetta, Rosso di Montalcino, Tuscany, Italy 2024 (Sangiovese)',
          glass: '11.5',
          carafe: '46',
          bottle: '67',
        },
        { name: 'Domaine des Murinais Crozes Hermitage, Vieilles Vignes, Rhône, France 2023 (Syrah)', bottle: '68' },
        { name: 'Walgate Wines, Pinot Noir, Kent, England 2022 (Pinot Noir)', bottle: '74' },
        { name: 'Joiseph, BFF, Burgenland, Austria 2021 (Blaufränkisch)', glass: '13', carafe: '52', bottle: '76' },
        {
          name: 'Château Graves de Pez Saint Estephe, Bordeaux, France 2020 (Cab Sauvignon, Merlot, Petit Verdot)',
          bottle: '78',
        },
        {
          name: 'Numer0, Etna Rosso, Sicily, Italy 2024 (Nerello Mascalese, Nerello Capuccio, Alicante Bouschet)',
          bottle: '82',
        },
        { name: 'Domaine Bart, Les Finottes, Marsannay, Burgundy, France 2022 (Pinot Noir)', bottle: '94' },
        {
          name: 'Terras Gauda, Quinta Sardonia, Castilla Y León, Spain 2019 (Tempranillo, Cab Sauv/Franc, Merlot, Syrah)',
          glass: '17',
          carafe: '68',
          bottle: '101',
        },
        { name: 'Cascina Roccalini, Barbaresco, Piedmont, Italy 2022 (Nebbiolo)', bottle: '129' },
      ],
    },
    {
      id: 'rose',
      title: 'Rosé',
      columns: ['125ml', '500ml', 'Btl'],
      wines: [
        {
          name: 'Château de Calavon, Provence, France 2025 (Syrah, Grenache, Rolle)',
          glass: '7.5',
          carafe: '30',
          bottle: '44',
        },
        {
          name: 'Clos Cibonne, Cuvée Tradition Rosé Cru Classé, Côtes de Provence, France 2024 (Tibouren, Grenache)',
          bottle: '86',
        },
      ],
    },
    {
      id: 'orange',
      title: 'Orange',
      columns: ['125ml', '500ml', 'Btl'],
      wines: [
        {
          name: 'Matic, Postopoma Orange, Stajerska, Slovenia 2025 (Kerner, Riesling)',
          glass: '8.5',
          carafe: '34',
          bottle: '49',
        },
        { name: 'A’Vita Leukò, Calabria, Italy 2024 (Greco Bianco, Gaglioppo)', bottle: '64' },
      ],
    },
  ] as WineSection[],
}

export type DrinkList = { title: string; unit?: string; items: MenuItem[] }

export const bar: { id: string; title: string; lists: DrinkList[] }[] = [
  {
    id: 'cocktails',
    title: 'Cocktails',
    lists: [
      {
        title: 'Cocktails',
        items: [
          { name: 'Paloma', price: '13' },
          { name: 'Chartreuse Sour', price: '13' },
          { name: 'Negroni', price: '13' },
          { name: 'Old Fashioned', price: '14' },
          { name: 'Espresso Martini', price: '13' },
          { name: 'Gin/Vodka Martini', price: '13' },
        ],
      },
    ],
  },
  {
    id: 'beer',
    title: 'Beer & cider',
    lists: [
      {
        title: 'Keg Beer & Cider',
        unit: 'Pint',
        items: [
          { name: 'Lost & Grounded X The Baring Lager 4%', price: '7' },
          { name: 'Lost & Grounded Wanna go to the Sun Pale Ale 4.2%', price: '7' },
          { name: 'Pillars Helles Lager Gluten free 4.8%', price: '7.5' },
          { name: 'Crafty Apple Cider 4.5%', price: '7' },
          { name: 'East London Brewing Co. Cowcatcher APA 4.8%', price: '7' },
          { name: 'Verdant Psych! IPA 0.5%', price: '7.5' },
        ],
      },
      { title: 'Cask Beer', items: [{ name: 'Five Points XPA 4% Gluten free', price: '6' }] },
      {
        title: 'Bottles & Cans',
        unit: '33cl',
        items: [
          { name: 'De Dolle Dulle Teve Triple 10%', price: '13' },
          { name: 'Dupont Saison 6.5%', price: '7' },
        ],
      },
      {
        title: 'Bottles & Cans',
        unit: '44cl',
        items: [{ name: 'Burnt Mill Beyond the Firs Pale Ale Gluten free 4.8%', price: '9.5' }],
      },
      {
        title: 'Bottles & Cans',
        unit: '47cl',
        items: [{ name: 'Anspach & Hobday London Black Nitro Porter 4.4%', price: '8.5' }],
      },
      {
        title: 'Bottles & Cans',
        unit: '50cl',
        items: [
          { name: 'Augustiner Oktoberfest Bier 6.3%', price: '8.5' },
          { name: 'Firestone Walker Imperial Reserve Smoked Porter 11%', price: '30' },
        ],
      },
      {
        title: 'Sharing Bottles',
        unit: '75cl',
        items: [{ name: 'Tilquin Oude Plum Jaune à l’Ancienne 7%', price: '45' }],
      },
    ],
  },
  {
    id: 'spirits',
    title: 'Spirits',
    lists: [
      {
        title: 'Gin',
        unit: '35ml',
        items: [
          { name: 'Sapling London Dry', price: '6' },
          { name: 'Bordeaux Distilling Co', price: '7' },
          { name: 'Nikka Coffey Gin', price: '8' },
          { name: 'Boatyard Old Tom PX Gin', price: '6.5' },
        ],
      },
      {
        title: 'Vodka',
        unit: '35ml',
        items: [
          { name: 'Sapling', price: '6' },
          { name: 'Our London', price: '7' },
        ],
      },
      {
        title: 'Blended Whisky',
        unit: '35ml',
        items: [
          { name: 'Copper dog', price: '6' },
          { name: 'Green Spot', price: '8' },
        ],
      },
      {
        title: 'Single Malt',
        unit: '35ml',
        items: [
          { name: 'Ardberg 10 Year', price: '8' },
          { name: 'Bruichladdich Port Charlotte 10 Year', price: '8' },
          { name: 'Aberlour A’bunadh Batch 77', price: '15' },
          { name: 'Nc’Nean Organic Scotch', price: '8' },
        ],
      },
      {
        title: 'Bourbon & Rye',
        unit: '35ml',
        items: [
          { name: 'Buffalo Trace', price: '6' },
          { name: 'Eagle Rare', price: '8' },
          { name: 'Michters US *1', price: '10' },
          { name: 'Sonoma Distilling Co. Cherrywood Rye', price: '10' },
        ],
      },
      {
        title: 'Rum',
        unit: '35ml',
        items: [
          { name: 'Drop Works Clear Drop Rum', price: '6.5' },
          { name: 'Drop Works Dark Rum', price: '6.5' },
          { name: 'Cut Spiced Rum', price: '6.5' },
        ],
      },
      {
        title: 'Tequila & Agave Spirit',
        unit: '35ml',
        items: [
          { name: 'El Rayo Plata', price: '6.5' },
          { name: 'Pensador Espadin Mezcal', price: '8.5' },
        ],
      },
      {
        title: 'Brandy',
        unit: '35ml',
        items: [
          { name: 'Darroze Bas-Armagnac Les Grands Assemblages 12', price: '14' },
          { name: 'Domaine de Chez Maillard Cognac Leyrat XO', price: '19' },
          { name: 'Château de Léberon Armagnac 1992', price: '26' },
        ],
      },
      {
        title: 'Digestif',
        unit: '35ml',
        items: [
          { name: 'Julien Fremont Calvados Réserve', price: '11' },
          { name: 'Chartreuse Yellow Liqueur', price: '8' },
          { name: 'Nuvo Nivo London Eau de Vie 35ml', price: '10' },
          { name: 'Amaro Montenegro', price: '6' },
        ],
      },
    ],
  },
  {
    id: 'soft',
    title: 'Soft drinks',
    lists: [
      {
        title: 'Soft Drinks',
        items: [
          { name: 'Blurred Vines ‘Spark’ alcohol free 125ml', price: '7' },
          { name: 'Botivo & soda', price: '7' },
          { name: 'Everleaf & Slimline Tonic', price: '7' },
          { name: 'Seasonal soda', price: '4' },
          { name: 'Coke', price: '4' },
          { name: 'Diet Coke', price: '4' },
          { name: 'Ginger beer', price: '4' },
          { name: 'Lemonade', price: '4' },
          { name: 'Virgin Mary', price: '5' },
          { name: 'Orange Juice / Apple Juice', price: '4' },
          { name: 'Tonic Water / Slimline Tonic Water', price: '2.5' },
        ],
      },
    ],
  },
]

// October-Feasting-2026.pdf, linked from /groupbooking
export const feasting = {
  title: 'October Feasting Menu 2026',
  pdf: `${site}/s/October-Feasting-2026.pdf`,
  perPerson: 60,
  intro: [
    'Our menu is served sharing style for the entire group. We will serve a selection of starters and then ask that you choose one main course and one dessert for the entire table to share.',
    'Please note supplements must be taken by the whole table',
    'Dietary restrictions will be catered for separately.',
  ],
  starters: {
    label: 'Starter - please choose as many as you wish from options below to share:',
    options: [
      { id: 'croquettes', name: 'Spiced squash & feta croquettes, harissa yoghurt' },
      { id: 'brandade', name: 'Salt cod brandade, pickled lemon & grilled focaccia' },
      { id: 'burrata', name: 'Puglian burrata, Parma ham & Solliès figs' },
    ],
  },
  mains: {
    label: 'Main course - please choose one option for all guests to share',
    options: [
      { id: 'lamb', name: 'Spiced shawarma lamb shoulder, smoked beetroots & freekeh', supplement: 0 },
      { id: 'pork', name: 'Grilled Ibaïama pork collar, crispy potatoes & café de Paris sauce', supplement: 0 },
      { id: 'cod', name: 'Cornish cod, coco beans, romesco & cimi di rapa', supplement: 0 },
      {
        id: 'sirloin',
        name: 'Grilled Highland sirloin of beef, chimichurri, triple cooked chips, aioli & hispi cabbage',
        supplement: 10,
        supplementText: '£10 supplement per guest',
      },
    ],
  },
  desserts: {
    label: 'Dessert - please choose one option for all guests to share',
    options: [
      { id: 'tarte', name: 'Tarte Normande & Calvados crème fraîche' },
      { id: 'rice', name: 'Cold vanilla rice pudding & Comice pears' },
      { id: 'posset', name: 'Lemon posset, Miyagawa satsumas & lemon verbena shortbread' },
    ],
  },
  extras: [
    { id: 'cheese', name: 'Additional cheese course', price: 10, per: 'guest' as const },
    { id: 'coffee', name: 'Cafetière coffee - serves 3', price: 12, per: 'three' as const },
    { id: 'linen', name: 'Linen table cloth hire', price: 50, per: 'booking' as const },
  ],
  serviceRate: 0.125,
  notes: ['A discretionary 12.5% service charge will be added to the final bill', allergens],
}

export const privateDining = {
  capacity: 32,
  // Their words, from the site and the group booking brochure.
  lead: 'Our private dining room is located on the first floor of the pub and seats up to 32 guests.',
  room: [
    'Positioned next to our open kitchen and benefiting from full height windows, the space is bathed in natural light throughout the day.',
    'Come the evening the lights are dimmed, and an abundance of candles lit to create a warm and atmospheric space.',
    'The room is fully air conditioned and perfectly cool even on the warmest of summer days.',
  ],
  howTo: 'please email enquiries@thebaring.co.uk for further information and availability',
}

// Checked against the original articles and listings (see research/notes.md).
export type Accolade = {
  id: string
  title: string
  detail: string
  quote?: string
  by?: string
  date?: string
  url: string
}

export const accolades: Accolade[] = [
  {
    id: 'top50',
    title: 'Estrella Damm Top 50 Gastropubs',
    detail: 'No. 17 in 2025 and 2026. Highest New Entry, 2023.',
    url: 'https://www.top50gastropubs.com/Pubs/UK/Greater-London/the-baring.html',
  },
  {
    id: 'michelin',
    title: 'The Michelin Guide',
    detail: 'Listed in Great Britain & Ireland.',
    quote: 'dishes that are uncluttered yet full of flavour',
    url: 'https://guide.michelin.com/gb/en/greater-london/london/restaurant/the-baring',
  },
  {
    id: 'gfg',
    title: 'The Good Food Guide',
    detail: 'Listed.',
    quote: 'sets the standard for what a neighbourhood dining pub can and should do',
    url: 'https://www.thegoodfoodguide.co.uk/restaurant/the-baring/id/48272',
  },
  {
    id: 'guardian',
    title: 'The Guardian',
    detail: 'Grace Dent',
    quote: 'a benchmark of where pub dining is heading',
    by: 'Grace Dent',
    date: '26 August 2022',
    url: 'https://www.theguardian.com/food/2022/aug/26/the-baring-london-n1-a-benchmark-of-where-pub-dining-is-heading-restaurant-review',
  },
  {
    id: 'standard',
    title: 'Evening Standard',
    detail: 'Jimi Famurewa',
    quote: 'old-fashioned generosity of spirit and a nimble, timely progressiveness',
    by: 'Jimi Famurewa',
    date: '24 August 2022',
    url: 'https://www.standard.co.uk/going-out/restaurants/the-baring-pub-review-islington-london-b1020541.html',
  },
]

export type Photo = {
  id: string
  alt: string
  w: number
  h: number
  light: 'day' | 'candle'
}

export const photos: Record<string, Photo> = {
  quail: {
    id: 'jwhowardphoto-56',
    alt: 'Quail shish on a skewer with garlic yoghurt, pul biber chilli oil and pickled red cabbage, on a white plate on a polished wooden table',
    w: 4,
    h: 5,
    light: 'day',
  },
  roomWide: {
    id: 'hr-36',
    alt: 'The first-floor room in afternoon sun: a long table laid with white linen, a geometric pendant lamp, a fireplace, and grey-green panelling on the right',
    w: 3,
    h: 2,
    light: 'day',
  },
  roomWindows: {
    id: 'hr-34',
    alt: 'Sash windows with café curtains above a long table set with linen, glasses and tall candles; terraced houses across the street',
    w: 3,
    h: 2,
    light: 'day',
  },
  roomShade: {
    id: 'hr-26',
    alt: 'The first-floor room in shade, a painting between two tall sash windows',
    w: 3,
    h: 2,
    light: 'day',
  },
  candlesSun: {
    id: 'hr-28',
    alt: 'Tall candles and a ribbed glass hurricane lamp on a sunlit linen tablecloth',
    w: 4,
    h: 5,
    light: 'day',
  },
  pendant: {
    id: 'hr-10',
    alt: 'The private room with its geometric pendant lamp, candles on the mantelpiece and dried grasses',
    w: 4,
    h: 5,
    light: 'day',
  },
  settings: {
    id: 'hr-29',
    alt: 'Place settings on white linen, ribbed tumblers and wine glasses, dark wooden chairs',
    w: 4,
    h: 5,
    light: 'day',
  },
  longTable: {
    id: 'hr-38',
    alt: 'A long table by the window with lit candles and dark wooden chairs',
    w: 4,
    h: 5,
    light: 'day',
  },
  toasts: {
    id: 'hr-48',
    alt: 'A plate of toasts set down on a linen-covered table between wine bottles',
    w: 4,
    h: 5,
    light: 'candle',
  },
  laughing: {
    id: 'hr-79',
    alt: 'Guests laughing around a candlelit table with pints, wine and a ribbed glass hurricane lamp',
    w: 4,
    h: 5,
    light: 'candle',
  },
  served: {
    id: 'hr-13',
    alt: 'A guest laughing as a sharing plate arrives at a candlelit table',
    w: 4,
    h: 5,
    light: 'candle',
  },
  pudding: {
    id: 'hr-88',
    alt: 'The end of dinner: a pudding plate and spoon, a linen napkin, an espresso martini and a glass of white wine',
    w: 4,
    h: 5,
    light: 'candle',
  },
}

export const story = {
  opened: 'July 2022',
  previousNames: ['Baring Arms', 'the Poet'],
  suppliers: [
    { name: 'Primeur', what: 'fruit and veg' },
    { name: 'Flying Fish', what: 'fish, from Cornwall' },
    { name: 'Rhug Estate', what: 'meat, from an organic farm in north Wales' },
  ],
  stations: [
    { name: 'Essex Road', note: '700m' },
    { name: 'Haggerston', note: 'Overground, 950m' },
  ],
  sister: { name: 'the Kerfield Arms', where: 'Camberwell', year: '2025' },
}
