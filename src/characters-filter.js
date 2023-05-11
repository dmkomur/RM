const typeOfCharacters = ["-", "Parasite", "Human with ants in his eyes", "Human with antennae", "Superhuman (Ghost trains summoner)", "Genetic experiment", "Fish-Person", "Cromulon", "Self-aware arm", "Cat-Person", "Human with baby legs", "Bepisian", "Hivemind", "Mytholog", "Human with giant head", "Dog", "Bird-Person", "Korblock", "Boobloosian", "Elephant-Person", "Superhuman", "Gromflomite", "Centaur", "Organic gun", "Microverse inhabitant", "Vampire", "Light bulb-Alien", "Animal", "Robot-Crocodile hybrid", "Zigerion", "Giant", "Cone-nippled alien", "Demon", "Shapeshifter", "Game", "Amoeba-Person", "Clone", "Interdimensional gaseous being", "Flansian", "Gromflomite", "Zombodian", "Garblovian", "Gazorpian", "Cat-Person", "Eat shiter-Person", "Goddess", "Gazorpian reproduction robot", "Hammerhead-Person", "Hole", "Tuskfish", "Alphabetrian", "Cat", "Time God", "Unknown-nippled alien", "Krootabulan", "Zigerion", "Plutonian", "Jellybean", "Tentacle alien", "Miniverse inhabitant", "Cyborg", "Larva alien", "Snail alien", "Tinymouth", "Lizard-Person", "Alligator-Person", "Monster", "Conjoined twin", "Sentient ant colony", "Human Gazorpian", "Boobie buyer reptilian", "Meeseeks", "The Devil", "Cat controlled dead lady", "Octopus-Person", "Hairy alien", "Pickle", "Bread", "Mega Gargantuan", "Rat", "Gear-Person", "Blue ape alien", "Tentacle alien", "Ring-nippled alien", "Lobster-Alien", "Scrotian", "Shimshamian", "Omniscient being", "Slug", "Stair goblin", "Unknown-nippled alien", "Leprechaun", "Morty's toxic side", "Rick's toxic side", "Traflorkian", "Teenyverse inhabitant", "Trunk-Person", "Omniscient being", "Tumblorkian", "Hivemind", "Chair", "Drumbloxian", "Floop Floopian", "Greebybobe", "Corn-person", "Phone-Person", "Teddy Bear", "Little Human", "Mexican", "Giant Cat Monster", "Old Amazons", "Mannie", "Necrophiliac", "Eel", "Pizza", "Grandma", "Phone", "Doopidoo", "Pripudlian", "Nano Alien", "Human with a flower in his head", "Hologram", "Shrimp", "Caterpillar", "Wasp", "Toy", "Monogatron", "Fly", "God", "Dummy", "Human with tusks", "Gramuflackian", "Dragon", "Snake", "Human-Snake hybrid", "Soulless Puppet", "Half Soulless Puppet"]

const typeSelect = document.querySelector('#type')

function renderTypeOfCharacters(typeOfCharacters) {
    const markup = typeOfCharacters
        .filter((type, idx, arr) => arr.indexOf(type) === idx)
        .map((type) => `<option value="${type}">${type}</option>`)
        .join("");
    typeSelect.innerHTML = markup;
}

renderTypeOfCharacters(typeOfCharacters);
